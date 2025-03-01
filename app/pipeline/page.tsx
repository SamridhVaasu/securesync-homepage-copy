"use client"

import { Separator } from "@/components/ui/separator"

import React, { useState, useRef, useEffect, type ReactElement } from "react"
import {
  Box,
  Code,
  Cloud,
  Database,
  Server,
  Settings,
  Save,
  Trash2,
  Plus,
  X,
  GitBranch,
  Check,
  Copy,
  Play,
  Pause,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Download,
  Upload,
  LayoutTemplate,
  Zap,
  Workflow,
  Cpu,
  HardDrive,
  Lock,
  Eye,
  EyeOff,
  MoreVertical,
  Sun,
  Moon,
  Minus,
  Search,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Types
interface ComponentLibraryItem {
  type: string
  name: string
  icon: ReactElement
  description: string
  config?: Record<string, any>
}

interface DragPreview {
  show: boolean
  x: number
  y: number
  item: ComponentLibraryItem | null
}

interface Component {
  id: string
  type: string
  name: string
  icon: ReactElement
  x: number
  y: number
  inputs: string[]
  outputs: string[]
  config?: Record<string, any>
  status?: "idle" | "running" | "success" | "error"
  description?: string
}

interface Connection {
  id: string
  from: string
  fromOutput?: string
  to: string
  toInput?: string
  label?: string
}

interface PipelineTemplate {
  id: string
  name: string
  description: string
  components: Component[]
  connections: Connection[]
  tags: string[]
}

interface Position {
  x: number
  y: number
}

// Custom hook for managing pipeline state and interactions
function usePipeline() {
  const [components, setComponents] = useState<Component[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [connectingFrom, setConnectingFrom] = useState<{ component: Component; output?: string } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null)
  const [lastPosition, setLastPosition] = useState<Position>({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 })
  const [canvasOffset, setCanvasOffset] = useState<Position>({ x: 0, y: 0 })
  const [canvasScale, setCanvasScale] = useState(1)
  const [isSimulating, setIsSimulating] = useState(false)
  const [dragPreview, setDragPreview] = useState<DragPreview>({ show: false, x: 0, y: 0, item: null })

  const canvasRef = useRef<SVGSVGElement>(null)

  // Add component to canvas
  const handleAddComponent = (
    type: string,
    name: string,
    icon: ReactElement,
    x: number,
    y: number,
    config?: Record<string, any>,
  ) => {
    const newComponent: Component = {
      id: `component-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type,
      name,
      icon,
      x,
      y,
      inputs: ["input"],
      outputs: ["output"],
      config: config || {},
      status: "idle",
      description: "",
    }
    setComponents([...components, newComponent])
    return newComponent
  }

  // Start dragging a component
  const handleComponentDragStart = (e: React.MouseEvent, component: Component) => {
    e.stopPropagation()
    setIsDragging(true)
    setDraggedComponent(component)
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      setLastPosition({
        x: (e.clientX - rect.left) / canvasScale,
        y: (e.clientY - rect.top) / canvasScale,
      })
    }
  }

  // Handle canvas drag over for component movement
  const handleCanvasDragOver = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isDragging && draggedComponent) {
      const canvas = canvasRef.current
      if (canvas) {
        const rect = canvas.getBoundingClientRect()
        const x = (e.clientX - rect.left) / canvasScale
        const y = (e.clientY - rect.top) / canvasScale
        const dx = x - lastPosition.x
        const dy = y - lastPosition.y

        setComponents(
          components.map((c) => {
            if (c.id === draggedComponent.id) {
              return { ...c, x: c.x + dx, y: c.y + dy }
            }
            return c
          }),
        )

        setLastPosition({ x, y })
      }
    }
  }

  // End component dragging
  const handleCanvasDragEnd = () => {
    setIsDragging(false)
    setDraggedComponent(null)
  }

  // Start creating a connection
  const handleConnectionStart = (fromComponent: Component, output?: string) => {
    setConnectingFrom({ component: fromComponent, output })
  }

  // Complete a connection between components
  const handleConnectionEnd = (toComponent: Component, input?: string) => {
    if (connectingFrom && connectingFrom.component.id !== toComponent.id) {
      // Avoid duplicate connections
      const connectionExists = connections.some(
        (conn) => conn.from === connectingFrom.component.id && conn.to === toComponent.id,
      )

      if (!connectionExists) {
        const newConnection: Connection = {
          id: `connection-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          from: connectingFrom.component.id,
          fromOutput: connectingFrom.output || "output",
          to: toComponent.id,
          toInput: input || "input",
        }

        setConnections([...connections, newConnection])
        toast.success("Connection created successfully")
      } else {
        toast.error("Connection already exists")
      }
    }
    setConnectingFrom(null)
  }

  // Delete a component and its connections
  const handleDeleteComponent = (componentId: string) => {
    // Remove component
    setComponents(components.filter((c) => c.id !== componentId))

    // Remove all connections to/from this component
    setConnections(connections.filter((conn) => conn.from !== componentId && conn.to !== componentId))

    toast.success("Component deleted")
  }

  // Delete a connection
  const handleDeleteConnection = (connectionId: string) => {
    setConnections(connections.filter((conn) => conn.id !== connectionId))
    toast.success("Connection deleted")
  }

  // Track mouse position for drawing temporary connections
  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / canvasScale,
        y: (e.clientY - rect.top) / canvasScale,
      })

      if (isDragging && draggedComponent) {
        handleCanvasDragOver(e)
      }
    }
  }

  // Render a connection between components
  const renderConnection = (connection: Connection) => {
    const fromComponent = components.find((c) => c.id === connection.from)
    const toComponent = components.find((c) => c.id === connection.to)

    if (!fromComponent || !toComponent) return null

    const fromX = fromComponent.x + 150 // right side of component
    const fromY = fromComponent.y + 40 // middle of component
    const toX = toComponent.x // left side of component
    const toY = toComponent.y + 40 // middle of component

    // Bezier curve control points
    const controlX1 = fromX + 50
    const controlY1 = fromY
    const controlX2 = toX - 50
    const controlY2 = toY

    // Determine connection color based on status
    let strokeColor = "hsl(var(--accent))" // Default accent color
    let strokeWidth = 2

    if (isSimulating) {
      const fromStatus = fromComponent.status
      if (fromStatus === "running") {
        strokeColor = "#F59E0B" // Amber for running
        strokeWidth = 3
      } else if (fromStatus === "success") {
        strokeColor = "#10B981" // Green for success
        strokeWidth = 2
      } else if (fromStatus === "error") {
        strokeColor = "#EF4444" // Red for error
        strokeWidth = 2
      }
    }

    return (
      <g key={connection.id} className="connection-group">
        <path
          d={`M ${fromX} ${fromY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${toX} ${toY}`}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          markerEnd="url(#arrowhead)"
          className="cursor-pointer hover:stroke-opacity-70 transition-all duration-200"
        />

        {/* Connection label */}
        {connection.label && (
          <g transform={`translate(${(fromX + toX) / 2 - 20}, ${(fromY + toY) / 2 - 10})`}>
            <rect width="40" height="20" rx="4" fill="white" stroke="#E2E8F0" strokeWidth="1" />
            <text x="20" y="14" textAnchor="middle" fontSize="10" fill="#64748B">
              {connection.label}
            </text>
          </g>
        )}

        {/* Delete button (appears on hover) */}
        <g
          transform={`translate(${(fromX + toX) / 2 - 8}, ${(fromY + toY) / 2 - 8})`}
          onClick={() => handleDeleteConnection(connection.id)}
          className="connection-delete opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <circle cx="8" cy="8" r="8" fill="#EF4444" className="opacity-80" />
          <path d="M5 5 L11 11 M11 5 L5 11" stroke="white" strokeWidth="1.5" />
        </g>
      </g>
    )
  }

  // Temporary connection line when connecting components
  const TempConnection = () => {
    if (!connectingFrom) return null

    const fromComponent = components.find((c) => c.id === connectingFrom.component.id)
    if (!fromComponent) return null

    const fromX = fromComponent.x + 150
    const fromY = fromComponent.y + 40
    const toX = mousePosition.x
    const toY = mousePosition.y

    const controlX1 = fromX + 50
    const controlY1 = fromY
    const controlX2 = toX - 50
    const controlY2 = toY

    return (
      <path
        d={`M ${fromX} ${fromY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${toX} ${toY}`}
        stroke="#6366F1"
        strokeWidth="2"
        strokeDasharray="5,5"
        fill="transparent"
        className="animate-pulse"
      />
    )
  }

  // Update component configuration
  const updateComponentConfig = (componentId: string, config: Record<string, any>) => {
    setComponents(
      components.map((c) => {
        if (c.id === componentId) {
          return { ...c, config: { ...c.config, ...config } }
        }
        return c
      }),
    )
  }

  // Update component properties
  const updateComponent = (componentId: string, updates: Partial<Component>) => {
    setComponents(
      components.map((c) => {
        if (c.id === componentId) {
          return { ...c, ...updates }
        }
        return c
      }),
    )
  }

  // Zoom canvas in/out
  const handleZoom = (delta: number) => {
    setCanvasScale((prevScale) => {
      const newScale = Math.max(0.5, Math.min(2, prevScale + delta * 0.1))
      return newScale
    })
  }

  // Pan canvas
  const handlePan = (dx: number, dy: number) => {
    setCanvasOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }))
  }

  // Reset canvas view
  const resetView = () => {
    setCanvasOffset({ x: 0, y: 0 })
    setCanvasScale(1)
  }

  // Load a template
  const loadTemplate = (template: PipelineTemplate) => {
    // Position template in the center of the canvas
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const centerX = rect.width / 2 / canvasScale
      const centerY = rect.height / 2 / canvasScale

      // Calculate bounding box of template components
      let minX = Number.POSITIVE_INFINITY,
        minY = Number.POSITIVE_INFINITY
      let maxX = Number.NEGATIVE_INFINITY,
        maxY = Number.NEGATIVE_INFINITY

      template.components.forEach((comp) => {
        minX = Math.min(minX, comp.x)
        minY = Math.min(minY, comp.y)
        maxX = Math.max(maxX, comp.x + 150)
        maxY = Math.max(maxY, comp.y + 80)
      })

      const templateWidth = maxX - minX
      const templateHeight = maxY - minY
      const templateCenterX = minX + templateWidth / 2
      const templateCenterY = minY + templateHeight / 2

      // Calculate offset to center the template
      const offsetX = centerX - templateCenterX
      const offsetY = centerY - templateCenterY

      // Create new components with adjusted positions
      const newComponents = template.components.map((comp) => ({
        ...comp,
        id: `component-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        x: comp.x + offsetX,
        y: comp.y + offsetY,
      }))

      // Create a mapping from old IDs to new IDs
      const idMapping: Record<string, string> = {}
      template.components.forEach((comp, index) => {
        idMapping[comp.id] = newComponents[index].id
      })

      // Create new connections with updated IDs
      const newConnections = template.connections.map((conn) => ({
        ...conn,
        id: `connection-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        from: idMapping[conn.from],
        to: idMapping[conn.to],
      }))

      setComponents([...components, ...newComponents])
      setConnections([...connections, ...newConnections])

      toast.success(`Template "${template.name}" loaded successfully`)
    }
  }

  // Simulate pipeline execution
  const simulatePipeline = () => {
    if (components.length === 0) {
      toast.error("No components to simulate")
      return
    }

    setIsSimulating(true)

    // Reset all components to idle
    setComponents(components.map((c) => ({ ...c, status: "idle" })))

    // Find source components (those that have no incoming connections)
    const sourceComponentIds = components.filter((c) => !connections.some((conn) => conn.to === c.id)).map((c) => c.id)

    if (sourceComponentIds.length === 0) {
      toast.error("No source components found")
      setIsSimulating(false)
      return
    }

    // Start simulation from source components
    simulateComponentExecution(sourceComponentIds)
  }

  // Simulate execution of components
  const simulateComponentExecution = (componentIds: string[]) => {
    if (!isSimulating) return

    // Set components to running
    setComponents((prev) => prev.map((c) => (componentIds.includes(c.id) ? { ...c, status: "running" } : c)))

    // Process each component with random timing
    componentIds.forEach((componentId) => {
      const delay = 1000 + Math.random() * 2000

      setTimeout(() => {
        if (!isSimulating) return

        // 90% chance of success
        const success = Math.random() > 0.1

        // Update component status
        setComponents((prev) =>
          prev.map((c) => (c.id === componentId ? { ...c, status: success ? "success" : "error" } : c)),
        )

        // If successful, find and execute next components
        if (success) {
          const nextComponentIds = connections.filter((conn) => conn.from === componentId).map((conn) => conn.to)

          if (nextComponentIds.length > 0) {
            simulateComponentExecution(nextComponentIds)
          } else {
            // Check if all components have been processed
            checkSimulationComplete()
          }
        } else {
          // Check if all components have been processed
          checkSimulationComplete()
        }
      }, delay)
    })
  }

  // Check if simulation is complete
  const checkSimulationComplete = () => {
    setComponents((prev) => {
      const allProcessed = prev.every((c) => c.status !== "idle" && c.status !== "running")

      if (allProcessed) {
        const allSuccess = prev.every((c) => c.status !== "error")

        if (allSuccess) {
          toast.success("Pipeline execution completed successfully")
        } else {
          toast.error("Pipeline execution failed")
        }

        setIsSimulating(false)
      }

      return prev
    })
  }

  // Stop simulation
  const stopSimulation = () => {
    setIsSimulating(false)
    setComponents(components.map((c) => ({ ...c, status: "idle" })))
    toast.info("Simulation stopped")
  }

  return {
    components,
    setComponents,
    connections,
    setConnections,
    connectingFrom,
    canvasRef,
    canvasOffset,
    canvasScale,
    isSimulating,
    handleAddComponent,
    handleComponentDragStart,
    handleCanvasDragOver,
    handleCanvasDragEnd,
    handleConnectionStart,
    handleConnectionEnd,
    handleDeleteComponent,
    handleDeleteConnection,
    handleMouseMove,
    renderConnection,
    TempConnection,
    updateComponentConfig,
    updateComponent,
    handleZoom,
    handlePan,
    resetView,
    loadTemplate,
    simulatePipeline,
    stopSimulation,
  }
}

// Component library items with enhanced icons and descriptions
const componentLibrary = [
  {
    type: "source",
    name: "Git Repository",
    icon: <GitBranch className="h-6 w-6" />,
    description: "Source code repository that triggers the pipeline",
    config: {
      url: "https://github.com/user/repo",
      branch: "main",
      auth: "ssh",
    },
  },
  {
    type: "build",
    name: "Build Step",
    icon: <Code className="h-6 w-6" />,
    description: "Compile and build the application",
    config: {
      command: "npm run build",
      environment: "node:16",
      timeout: 300,
    },
  },
  {
    type: "test",
    name: "Test",
    icon: <Zap className="h-6 w-6" />,
    description: "Run automated tests",
    config: {
      command: "npm test",
      coverage: true,
      failOnError: true,
    },
  },
  {
    type: "deploy",
    name: "Deploy",
    icon: <Cloud className="h-6 w-6" />,
    description: "Deploy to production or staging environment",
    config: {
      target: "production",
      strategy: "rolling",
      rollback: true,
    },
  },
  {
    type: "database",
    name: "Database",
    icon: <Database className="h-6 w-6" />,
    description: "Database operations like migrations",
    config: {
      type: "postgres",
      migrations: true,
      backup: true,
    },
  },
  {
    type: "server",
    name: "Server",
    icon: <Server className="h-6 w-6" />,
    description: "Server configuration and provisioning",
    config: {
      provider: "aws",
      region: "us-east-1",
      size: "t3.medium",
    },
  },
  {
    type: "container",
    name: "Container",
    icon: <Box className="h-6 w-6" />,
    description: "Docker container build and management",
    config: {
      image: "node:16-alpine",
      registry: "docker.io",
      tag: "latest",
    },
  },
  {
    type: "config",
    name: "Configuration",
    icon: <Settings className="h-6 w-6" />,
    description: "Environment configuration and secrets",
    config: {
      env: "production",
      secrets: true,
      configMap: true,
    },
  },
  {
    type: "security",
    name: "Security Scan",
    icon: <Lock className="h-6 w-6" />,
    description: "Security scanning and vulnerability checks",
    config: {
      scanType: "dependency",
      severity: "high",
      autoFix: false,
    },
  },
  {
    type: "notification",
    name: "Notification",
    icon: <AlertCircle className="h-6 w-6" />,
    description: "Send notifications about pipeline status",
    config: {
      channel: "slack",
      events: ["success", "failure"],
      recipients: "@devops-team",
    },
  },
  {
    type: "compute",
    name: "Compute",
    icon: <Cpu className="h-6 w-6" />,
    description: "Compute resources for processing tasks",
    config: {
      type: "serverless",
      memory: "1GB",
      timeout: 60,
    },
  },
  {
    type: "storage",
    name: "Storage",
    icon: <HardDrive className="h-6 w-6" />,
    description: "Storage services for artifacts and data",
    config: {
      type: "s3",
      region: "us-east-1",
      encryption: true,
    },
  },
]

// Predefined pipeline templates
const pipelineTemplates: PipelineTemplate[] = [
  {
    id: "ci-cd-basic",
    name: "Basic CI/CD Pipeline",
    description: "A simple CI/CD pipeline with build, test, and deploy stages",
    tags: ["CI/CD", "Basic"],
    components: [
      {
        id: "src-1",
        type: "source",
        name: "GitHub Repository",
        icon: <GitBranch className="h-6 w-6" />,
        x: 100,
        y: 100,
        inputs: [],
        outputs: ["output"],
        config: {
          url: "https://github.com/user/repo",
          branch: "main",
        },
      },
      {
        id: "build-1",
        type: "build",
        name: "Build Application",
        icon: <Code className="h-6 w-6" />,
        x: 300,
        y: 100,
        inputs: ["input"],
        outputs: ["output"],
        config: {
          command: "npm run build",
        },
      },
      {
        id: "test-1",
        type: "test",
        name: "Run Tests",
        icon: <Zap className="h-6 w-6" />,
        x: 500,
        y: 100,
        inputs: ["input"],
        outputs: ["output"],
        config: {
          command: "npm test",
        },
      },
      {
        id: "deploy-1",
        type: "deploy",
        name: "Deploy to Production",
        icon: <Cloud className="h-6 w-6" />,
        x: 700,
        y: 100,
        inputs: ["input"],
        outputs: [],
        config: {
          target: "production",
        },
      },
    ],
    connections: [
      {
        id: "conn-1",
        from: "src-1",
        to: "build-1",
      },
      {
        id: "conn-2",
        from: "build-1",
        to: "test-1",
      },
      {
        id: "conn-3",
        from: "test-1",
        to: "deploy-1",
      },
    ],
  },
  {
    id: "microservice-deploy",
    name: "Microservice Deployment",
    description: "Pipeline for building and deploying microservices with containers",
    tags: ["Microservices", "Containers"],
    components: [
      {
        id: "src-1",
        type: "source",
        name: "Microservice Repo",
        icon: <GitBranch className="h-6 w-6" />,
        x: 100,
        y: 100,
        inputs: [],
        outputs: ["output"],
        config: {
          url: "https://github.com/user/microservice",
        },
      },
      {
        id: "build-1",
        type: "build",
        name: "Build Service",
        icon: <Code className="h-6 w-6" />,
        x: 300,
        y: 100,
        inputs: ["input"],
        outputs: ["output"],
        config: {
          command: "npm run build",
        },
      },
      {
        id: "test-1",
        type: "test",
        name: "Unit Tests",
        icon: <Zap className="h-6 w-6" />,
        x: 500,
        y: 50,
        inputs: ["input"],
        outputs: ["output"],
        config: {
          command: "npm test",
        },
      },
      {
        id: "test-2",
        type: "test",
        name: "Integration Tests",
        icon: <Zap className="h-6 w-6" />,
        x: 500,
        y: 150,
        inputs: ["input"],
        outputs: ["output"],
        config: {
          command: "npm run test:integration",
        },
      },
      {
        id: "container-1",
        type: "container",
        name: "Build Container",
        icon: <Box className="h-6 w-6" />,
        x: 700,
        y: 100,
        inputs: ["input"],
        outputs: ["output"],
        config: {
          image: "node:16-alpine",
        },
      },
      {
        id: "deploy-1",
        type: "deploy",
        name: "Deploy Container",
        icon: <Cloud className="h-6 w-6" />,
        x: 900,
        y: 100,
        inputs: ["input"],
        outputs: [],
        config: {
          target: "kubernetes",
        },
      },
    ],
    connections: [
      {
        id: "conn-1",
        from: "src-1",
        to: "build-1",
      },
      {
        id: "conn-2",
        from: "build-1",
        to: "test-1",
      },
      {
        id: "conn-3",
        from: "build-1",
        to: "test-2",
      },
      {
        id: "conn-4",
        from: "test-1",
        to: "container-1",
      },
      {
        id: "conn-5",
        from: "test-2",
        to: "container-1",
      },
      {
        id: "conn-6",
        from: "container-1",
        to: "deploy-1",
      },
    ],
  },
  {
    id: "database-migration",
    name: "Database Migration Pipeline",
    description: "Pipeline for safely performing database migrations",
    tags: ["Database", "Migration"],
    components: [
      {
        id: "src-1",
        type: "source",
        name: "Migration Scripts",
        icon: <GitBranch className="h-6 w-6" />,
        x: 100,
        y: 100,
        inputs: [],
        outputs: ["output"],
        config: {
          url: "https://github.com/user/db-migrations",
        },
      },
      {
        id: "test-1",
        type: "test",
        name: "Validate Scripts",
        icon: <Zap className="h-6 w-6" />,
        x: 300,
        y: 100,
        inputs: ["input"],
        outputs: ["output"],
        config: {
          command: "npm run validate",
        },
      },
      {
        id: "backup-1",
        type: "storage",
        name: "Backup Database",
        icon: <HardDrive className="h-6 w-6" />,
        x: 500,
        y: 100,
        inputs: ["input"],
        outputs: ["output"],
        config: {
          type: "backup",
          retention: "7d",
        },
      },
      {
        id: "db-1",
        type: "database",
        name: "Run Migrations",
        icon: <Database className="h-6 w-6" />,
        x: 700,
        y: 100,
        inputs: ["input"],
        outputs: ["output"],
        config: {
          type: "postgres",
          migrations: true,
        },
      },
      {
        id: "test-2",
        type: "test",
        name: "Verify Migration",
        icon: <Zap className="h-6 w-6" />,
        x: 900,
        y: 100,
        inputs: ["input"],
        outputs: [],
        config: {
          command: "npm run verify",
        },
      },
    ],
    connections: [
      {
        id: "conn-1",
        from: "src-1",
        to: "test-1",
      },
      {
        id: "conn-2",
        from: "test-1",
        to: "backup-1",
      },
      {
        id: "conn-3",
        from: "backup-1",
        to: "db-1",
      },
      {
        id: "conn-4",
        from: "db-1",
        to: "test-2",
      },
    ],
  },
]

export default function PipelineBuilder() {
  const [showComponentDetails, setShowComponentDetails] = useState<Component | null>(null)
  const [pipelineName, setPipelineName] = useState("My DevOps Pipeline")
  const [pipelineDescription, setPipelineDescription] = useState("")
  const [savedPipelines, setSavedPipelines] = useState(["Production Deployment", "CI/CD Pipeline", "Test Environment"])
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showMiniMap, setShowMiniMap] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragPreview, setDragPreview] = useState<DragPreview>({ show: false, x: 0, y: 0, item: null })

  const {
    components,
    setComponents,
    connections,
    setConnections,
    connectingFrom,
    canvasRef,
    canvasOffset,
    canvasScale,
    isSimulating,
    handleAddComponent,
    handleComponentDragStart,
    handleCanvasDragEnd,
    handleConnectionStart,
    handleConnectionEnd,
    handleDeleteComponent,
    handleMouseMove,
    renderConnection,
    TempConnection,
    updateComponentConfig,
    updateComponent,
    handleZoom,
    handlePan,
    resetView,
    loadTemplate,
    simulatePipeline,
    stopSimulation,
  } = usePipeline()

  // Handle canvas click to deselect components
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setShowComponentDetails(null)
    }
  }

  // Save the current pipeline
  const handleSavePipeline = () => {
    if (!pipelineName.trim()) {
      toast.error("Please enter a pipeline name")
      return
    }

    if (!savedPipelines.includes(pipelineName)) {
      setSavedPipelines([...savedPipelines, pipelineName])
    }

    // Here in a real application we would save the pipeline state
    toast.success(`Pipeline "${pipelineName}" saved successfully!`)
  }

  // Export pipeline as JSON
  const exportPipeline = () => {
    const pipeline = {
      name: pipelineName,
      description: pipelineDescription,
      components,
      connections,
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pipeline, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", `${pipelineName.replace(/\s+/g, "-").toLowerCase()}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()

    toast.success("Pipeline exported successfully")
  }

  // Import pipeline from JSON
  const importPipeline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const pipeline = JSON.parse(event.target?.result as string)

        if (pipeline.components && pipeline.connections) {
          setPipelineName(pipeline.name || "Imported Pipeline")
          setPipelineDescription(pipeline.description || "")
          setComponents(pipeline.components)
          setConnections(pipeline.connections)
          toast.success("Pipeline imported successfully")
        } else {
          toast.error("Invalid pipeline file format")
        }
      } catch (error) {
        toast.error("Failed to parse pipeline file")
      }
    }
    reader.readAsText(file)

    // Reset the input value to allow importing the same file again
    e.target.value = ""
  }

  // Clear the canvas
  const clearCanvas = () => {
    if (components.length === 0) return

    if (confirm("Are you sure you want to clear the canvas? This action cannot be undone.")) {
      setComponents([])
      setConnections([])
      setShowComponentDetails(null)
      toast.success("Canvas cleared")
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete selected component with Delete key
      if (e.key === "Delete" && showComponentDetails) {
        handleDeleteComponent(showComponentDetails.id)
        setShowComponentDetails(null)
      }

      // Zoom with Ctrl + and Ctrl -
      if (e.ctrlKey && e.key === "=") {
        e.preventDefault()
        handleZoom(1)
      }
      if (e.ctrlKey && e.key === "-") {
        e.preventDefault()
        handleZoom(-1)
      }

      // Reset view with Ctrl + 0
      if (e.ctrlKey && e.key === "0") {
        e.preventDefault()
        resetView()
      }

      // Save with Ctrl + S
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault()
        handleSavePipeline()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showComponentDetails])

  // Get component status color
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "running":
        return "bg-amber-500"
      case "success":
        return "bg-emerald-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-slate-400"
    }
  }

  return (
    <div className={`flex flex-col h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground flex flex-col h-full">
        {/* Enhanced Header with Gradient Border */}
        <div className="relative border-b bg-card/95 backdrop-blur-sm">
          <div className="h-1 w-full bg-gradient-to-r from-accent via-primary to-accent/50"></div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Workflow className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Pipeline Builder</h1>
                  <p className="text-sm text-muted-foreground">Design and configure your deployment workflows</p>
                </div>
              </motion.div>

              <div className="flex items-center space-x-4">
                {/* Action Buttons Group */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg"
                >
                  <Input
                    type="text"
                    value={pipelineName}
                    onChange={(e) => setPipelineName(e.target.value)}
                    className="h-8 text-sm bg-transparent border-none w-48"
                    placeholder="Pipeline Name"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="ghost" onClick={handleSavePipeline} 
                          className="h-8 hover:bg-accent/10 hover:text-accent transition-colors"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Save pipeline (Ctrl+S)</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>

                <Separator orientation="vertical" className="h-8" />

                {/* Simulation Controls */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2"
                >
                  <Button
                    size="sm"
                    variant={isSimulating ? "destructive" : "default"}
                    onClick={isSimulating ? stopSimulation : simulatePipeline}
                    className="h-8 px-4 bg-accent text-white hover:bg-accent/90"
                  >
                    {isSimulating ? (
                      <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="flex items-center"
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Stop
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="flex items-center"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Simulate
                      </motion.div>
                    )}
                  </Button>
                </motion.div>

                <Separator orientation="vertical" className="h-8" />

                {/* View Controls */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={toggleDarkMode}
                    className="h-8 w-8 p-0 hover:bg-accent/10 hover:text-accent transition-colors"
                  >
                    <AnimatePresence mode="wait">
                      {darkMode ? (
                        <motion.div
                          key="sun"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                        >
                          <Sun className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="moon"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                        >
                          <Moon className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Enhanced Sidebar */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 border-r bg-card/95 backdrop-blur-sm overflow-hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col">
              {/* Search with animation */}
              <motion.div 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-3 border-b"
              >
                <div className="relative">
                  <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search components..." 
                    className="h-8 text-sm pl-8 bg-muted/50"
                  />
                </div>
              </motion.div>

              <ScrollArea className="flex-1">
                {/* Components Grid */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">Components</h3>
                    <Badge variant="outline" className="text-xs">
                      {componentLibrary.length}
                    </Badge>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 gap-2"
                  >
                    {componentLibrary.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative flex flex-col items-center p-2 bg-muted/50 rounded-lg border border-border/50 cursor-grab hover:border-accent/50 hover:bg-accent/5 transition-all duration-200"
                        drag
                        dragSnapToOrigin
                        whileHover={{ scale: 1.02 }}
                        whileDrag={{ 
                          scale: 1.05,
                          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                          cursor: "grabbing"
                        }}
                        onDragStart={() => setIsDragging(true)}
                        onDrag={(event, info) => {
                          const canvas = canvasRef.current
                          if (canvas) {
                            setDragPreview({
                              show: true,
                              x: info.point.x,
                              y: info.point.y,
                              item: {
                                type: item.type,
                                name: item.name,
                                icon: item.icon,
                                description: item.description,
                                config: item.config,
                              },
                            })
                          }
                        }}
                        onDragEnd={(event, info) => {
                          const canvas = canvasRef.current
                          if (canvas) {
                            const rect = canvas.getBoundingClientRect()
                            if (
                              info.point.x > rect.left &&
                              info.point.x < rect.right &&
                              info.point.y > rect.top &&
                              info.point.y < rect.bottom
                            ) {
                              handleAddComponent(
                                item.type,
                                item.name,
                                item.icon,
                                (info.point.x - rect.left) / canvasScale - canvasOffset.x - 75,
                                (info.point.y - rect.top) / canvasScale - canvasOffset.y - 30,
                                item.config,
                              )
                            }
                            setIsDragging(false)
                            setDragPreview({ show: false, x: 0, y: 0, item: null })
                          }
                        }}
                      >
                        <motion.div 
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="text-accent mb-1"
                        >
                          {item.icon}
                        </motion.div>
                        <span className="text-xs font-medium text-center">{item.name}</span>
                        <Badge variant="outline" className="mt-1 text-[10px] px-1 py-0">
                          {item.type}
                        </Badge>
                        
                        {/* Hover tooltip */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-12 left-0 right-0 bg-popover text-popover-foreground text-xs p-2 rounded-md shadow-lg pointer-events-none z-50 invisible group-hover:visible"
                        >
                          {item.description}
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </ScrollArea>

              {/* Enhanced Canvas Controls */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-3 border-t bg-muted/30 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 hover:bg-accent/10 hover:text-accent transition-colors"
                      onClick={() => handleZoom(-1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-xs font-medium w-12 text-center">
                      {Math.round(canvasScale * 100)}%
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 hover:bg-accent/10 hover:text-accent transition-colors"
                      onClick={() => handleZoom(1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs hover:bg-accent/10 hover:text-accent transition-colors"
                    onClick={resetView}
                  >
                    Reset View
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Canvas */}
          <div
            className="flex-1 relative overflow-hidden bg-background"
            onWheel={(e) => {
              if (e.ctrlKey) {
                e.preventDefault()
                handleZoom(e.deltaY > 0 ? -1 : 1)
              } else if (e.shiftKey) {
                e.preventDefault()
                handlePan(e.deltaX * -1, 0)
              } else {
                e.preventDefault()
                handlePan(e.deltaX * -1, e.deltaY * -1)
              }
            }}
          >
            <svg
              ref={canvasRef}
              className="w-full h-full"
              onClick={handleCanvasClick}
              onMouseMove={handleMouseMove}
              onMouseUp={handleCanvasDragEnd}
            >
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#6366F1" />
                </marker>
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid pattern */}
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="1" />
              </pattern>

              {/* Canvas background */}
              <g transform={`translate(${canvasOffset.x}, ${canvasOffset.y}) scale(${canvasScale})`}>
                <rect width="10000" height="10000" fill="url(#grid)" transform="translate(-5000, -5000)" />

                {/* Render Connections */}
                {connections.map(renderConnection)}

                {/* Temporary connection while dragging */}
                {connectingFrom && <TempConnection />}

                {/* Render Components */}
                {components.map((component) => (
                  <g
                    key={component.id}
                    transform={`translate(${component.x}, ${component.y})`}
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      setShowComponentDetails(component)
                      handleComponentDragStart(e, component)
                    }}
                    onMouseUp={() => {
                      if (connectingFrom) {
                        handleConnectionEnd(component)
                      } else {
                        handleCanvasDragEnd()
                      }
                    }}
                    className="cursor-move"
                  >
                    {/* Component shadow */}
                    <rect width="150" height="80" rx="6" ry="6" fill="rgba(0,0,0,0.1)" transform="translate(3, 3)" />

                    {/* Component background */}
                    <rect
                      width="150"
                      height="80"
                      rx="6"
                      ry="6"
                      fill={
                        component.id === showComponentDetails?.id ? "hsl(var(--accent) / 0.1)" : "hsl(var(--card))"
                      }
                      stroke={component.id === showComponentDetails?.id ? "hsl(var(--accent))" : "hsl(var(--border))"}
                      strokeWidth="2"
                      className={isSimulating && component.status === "running" ? "animate-pulse" : ""}
                      filter={isSimulating && component.status === "running" ? "url(#glow)" : ""}
                    />

                    {/* Status indicator */}
                    <circle
                      cx="135"
                      cy="15"
                      r="5"
                      className={`${getStatusColor(component.status)} transition-colors duration-300`}
                    />

                    {/* Component icon */}
                    <g transform="translate(10, 15)">
                      {React.cloneElement(component.icon, {
                        className: `text-accent ${isSimulating && component.status === "running" ? "animate-spin-slow" : ""}`,
                      })}
                    </g>

                    {/* Component name */}
                    <text x="45" y="30" className="text-sm font-medium fill-foreground">
                      {component.name}
                    </text>

                    {/* Input and Output points */}
                    <circle
                      cx="0"
                      cy="40"
                      r="6"
                      fill="hsl(var(--muted))"
                      stroke="hsl(var(--border))"
                      className="hover:fill-primary/20 transition-colors"
                      onMouseUp={() => handleConnectionEnd(component)}
                    />
                    <circle
                      cx="150"
                      cy="40"
                      r="6"
                      fill="hsl(var(--muted))"
                      stroke="hsl(var(--border))"
                      className="hover:fill-primary/20 transition-colors"
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        handleConnectionStart(component)
                      }}
                    />

                    {/* Delete button */}
                    <g
                      transform="translate(125, 10)"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteComponent(component.id)
                      }}
                      className="cursor-pointer hover:text-destructive opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <circle cx="7" cy="7" r="7" fill="hsl(var(--destructive) / 0.2)" />
                      <Trash2 className="h-3 w-3 translate-x-2.5 translate-y-2.5 text-destructive" />
                    </g>

                    {/* Component Type Label */}
                    <rect
                      x="10"
                      y="45"
                      width="60"
                      height="20"
                      rx="4"
                      fill="hsl(var(--accent) / 0.1)"
                      className="opacity-70"
                    />
                    <text x="15" y="59" className="text-xs font-medium fill-accent">
                      {component.type}
                    </text>
                  </g>
                ))}
              </g>
            </svg>

            {/* Minimap */}
            {showMiniMap && (
              <div className="absolute bottom-4 right-4 w-48 h-36 border rounded bg-background/80 shadow-md overflow-hidden">
                <svg width="100%" height="100%" viewBox="-5000 -5000 10000 10000" preserveAspectRatio="xMidYMid meet">
                  <rect width="10000" height="10000" fill="rgba(0,0,0,0.02)" transform="translate(-5000, -5000)" />

                  {/* Components in minimap */}
                  {components.map((component) => (
                    <rect
                      key={component.id}
                      x={component.x - 5}
                      y={component.y - 5}
                      width="160"
                      height="90"
                      rx="4"
                      fill="hsl(var(--primary) / 0.5)"
                    />
                  ))}

                  {/* Viewport indicator */}
                  <rect
                    x={-canvasOffset.x / canvasScale - 5000 / canvasScale}
                    y={-canvasOffset.y / canvasScale - 5000 / canvasScale}
                    width={10000 / canvasScale}
                    height={10000 / canvasScale}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="10"
                    strokeDasharray="40 20"
                    className="animate-dash"
                  />
                </svg>
              </div>
            )}

            {/* Zoom controls */}
            <div className="absolute bottom-4 left-4 flex flex-col bg-background/80 border rounded shadow-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-t-sm"
                onClick={() => handleZoom(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Separator />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-b-sm"
                onClick={() => handleZoom(-1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Component Details Panel */}
          {showComponentDetails && (
            <div className="w-72 border-l bg-card overflow-hidden flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="font-semibold">Component Details</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowComponentDetails(null)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Name</Label>
                    <Input
                      type="text"
                      value={showComponentDetails.name}
                      onChange={(e) => {
                        updateComponent(showComponentDetails.id, { name: e.target.value })
                        setShowComponentDetails({
                          ...showComponentDetails,
                          name: e.target.value,
                        })
                      }}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Type</Label>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-2">
                        {showComponentDetails.type}
                      </Badge>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(showComponentDetails.status)}`} />
                      <span className="text-xs ml-1 capitalize">{showComponentDetails.status || "idle"}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Description</Label>
                    <Textarea
                      value={showComponentDetails.description}
                      onChange={(e) => {
                        updateComponent(showComponentDetails.id, { description: e.target.value })
                        setShowComponentDetails({
                          ...showComponentDetails,
                          description: e.target.value,
                        })
                      }}
                      placeholder="Component description..."
                      className="mt-1 h-20 resize-none"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-muted-foreground mb-2 block">Configuration</Label>

                    {showComponentDetails.type === "source" && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs">Repository URL</Label>
                          <Input
                            value={showComponentDetails.config?.url || ""}
                            onChange={(e) => {
                              updateComponentConfig(showComponentDetails.id, { url: e.target.value })
                              setShowComponentDetails({
                                ...showComponentDetails,
                                config: { ...showComponentDetails.config, url: e.target.value },
                              })
                            }}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Branch</Label>
                          <Input
                            value={showComponentDetails.config?.branch || ""}
                            onChange={(e) => {
                              updateComponentConfig(showComponentDetails.id, { branch: e.target.value })
                              setShowComponentDetails({
                                ...showComponentDetails,
                                config: { ...showComponentDetails.config, branch: e.target.value },
                              })
                            }}
                            className="mt-1"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Trigger on push</Label>
                          <Switch
                            checked={showComponentDetails.config?.triggerOnPush || false}
                            onCheckedChange={(checked) => {
                              updateComponentConfig(showComponentDetails.id, { triggerOnPush: checked })
                              setShowComponentDetails({
                                ...showComponentDetails,
                                config: { ...showComponentDetails.config, triggerOnPush: checked },
                              })
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {showComponentDetails.type === "build" && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs">Build Command</Label>
                          <Input
                            value={showComponentDetails.config?.command || ""}
                            onChange={(e) => {
                              updateComponentConfig(showComponentDetails.id, { command: e.target.value })
                              setShowComponentDetails({
                                ...showComponentDetails,
                                config: { ...showComponentDetails.config, command: e.target.value },
                              })
                            }}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Environment</Label>
                          <Select
                            value={showComponentDetails.config?.environment || "node:16"}
                            onValueChange={(value) => {
                              updateComponentConfig(showComponentDetails.id, { environment: value })
                              setShowComponentDetails({
                                ...showComponentDetails,
                                config: { ...showComponentDetails.config, environment: value },
                              })
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select environment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="node:16">Node.js 16</SelectItem>
                              <SelectItem value="node:18">Node.js 18</SelectItem>
                              <SelectItem value="python:3.9">Python 3.9</SelectItem>
                              <SelectItem value="java:17">Java 17</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Timeout (seconds)</Label>
                          <Input
                            type="number"
                            value={showComponentDetails.config?.timeout || 300}
                            onChange={(e) => {
                              updateComponentConfig(showComponentDetails.id, {
                                timeout: Number.parseInt(e.target.value),
                              })
                              setShowComponentDetails({
                                ...showComponentDetails,
                                config: { ...showComponentDetails.config, timeout: Number.parseInt(e.target.value) },
                              })
                            }}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}

                    {/* Add more component type-specific configurations here */}
                    {showComponentDetails.type !== "source" && showComponentDetails.type !== "build" && (
                      <div className="space-y-3">
                        <Textarea
                          value={JSON.stringify(showComponentDetails.config, null, 2)}
                          onChange={(e) => {
                            try {
                              const config = JSON.parse(e.target.value)
                              updateComponentConfig(showComponentDetails.id, config)
                              setShowComponentDetails({
                                ...showComponentDetails,
                                config,
                              })
                            } catch (error) {
                              // Invalid JSON, don't update
                            }
                          }}
                          placeholder="Component configuration..."
                          className="font-mono text-xs h-40"
                        />
                        <p className="text-xs text-muted-foreground">Enter configuration as JSON</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <Button
                      className="w-full"
                      onClick={() => {
                        toast.success("Changes applied")
                      }}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Apply Changes
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>

      {/* Template Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Pipeline Templates</DialogTitle>
            <DialogDescription>Choose a template to quickly create a new pipeline</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {pipelineTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 border rounded-md hover:border-primary cursor-pointer"
                onClick={() => {
                  loadTemplate(template)
                  setShowTemplateDialog(false)
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{template.name}</h3>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Drag Preview */}
      {dragPreview.show && dragPreview.item && (
        <motion.div
          className="fixed pointer-events-none bg-muted/90 rounded border shadow-lg p-2 z-50"
          style={{
            left: dragPreview.x - 50,
            top: dragPreview.y - 25,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center space-x-2">
            <div className="text-primary">{dragPreview.item.icon}</div>
            <span className="text-xs font-medium">{dragPreview.item.name}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

