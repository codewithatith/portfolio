export const projects = [
  {
    id: 1,
    title: "Veren",
    subtitle: "Full-Stack Deployment Platform",
    description: "A comprehensive deployment platform combining the best of Vercel and Render. Built with container orchestration, auto-scaling, and intelligent domain routing.",
    longDescription: "Veren is a full-stack deployment platform that combines the developer experience of Vercel with the infrastructure flexibility of Render. Features include automatic container orchestration, intelligent auto-scaling based on traffic patterns, custom domain management, and seamless CI/CD integration.",
    tech: ["Go", "Docker", "Kubernetes", "PostgreSQL", "Redis", "Nginx"],
    features: [
      "Container orchestration with custom scheduler",
      "Auto-scaling based on CPU/memory metrics",
      "Intelligent domain routing and SSL management",
      "Built-in CI/CD pipeline integration",
      "Real-time deployment monitoring"
    ],
    github: "https://github.com/atithi4dev/veren",
    demo: "https://veren-demo.vercel.app",
    image: "/api/placeholder/600/400",
    status: "Active Development",
    version: "v1",
    category: "Infrastructure"
  },
  {
    id: 2,
    title: "HLS Video Streaming Platform",
    subtitle: "High-Performance Media Pipeline",
    description: "Enterprise-grade video streaming platform with HLS transcoding, adaptive bitrate streaming, and real-time analytics.",
    longDescription: "Built a complete video streaming solution from scratch using FFmpeg for transcoding, custom HLS segment generation, and adaptive bitrate streaming. Includes real-time analytics, CDN integration, and support for multiple video formats.",
    tech: ["Node.js", "FFmpeg", "HLS", "WebRTC", "Redis", "PostgreSQL"],
    features: [
      "Multi-format video transcoding (MP4, WebM, MOV)",
      "Adaptive bitrate streaming with HLS",
      "Real-time transcoding pipeline",
      "CDN integration for global delivery",
      "Analytics dashboard with viewer metrics"
    ],
    github: "https://github.com/atithi4dev/ytengine",
    demo: "https://streaming-demo.vercel.app",
    image: "/api/placeholder/600/400",
    status: "Production Ready",
    version: "v2",
    category: "Media/Streaming"
  },
  {
    id: 3,
    title: "Redis Implementation",
    subtitle: "Built from Scratch",
    description: "A complete Redis clone implemented from scratch in Go, including RESP protocol, data structures, and persistence.",
    longDescription: "Implemented a Redis-compatible in-memory database from scratch, including the RESP (Redis Serialization Protocol), core data structures (strings, lists, sets, hashes), persistence with RDB snapshots, and basic replication. Built for learning distributed systems concepts.",
    tech: ["Go", "TCP", "Protocol Design", "Data Structures"],
    features: [
      "Full RESP protocol implementation",
      "Core data structures (strings, lists, sets, hashes)",
      "RDB persistence and snapshots",
      "Basic replication protocol",
      "Memory-efficient data storage"
    ],
    github: "https://github.com/atithi4dev/redis",
    demo: null,
    image: "/api/placeholder/600/400",
    status: "Learning Project",
    version: null,
    category: "Database Systems"
  },
  {
    id: 4,
    title: "Zerodha Clone",
    subtitle: "Full-Stack Trading Platform",
    description: "A comprehensive stock trading platform clone with real-time market data, order management, and portfolio tracking.",
    longDescription: "Built a complete trading platform inspired by Zerodha, featuring real-time stock price updates, advanced order placement (market, limit, stop-loss), portfolio management, and interactive charts. Implements WebSocket for live data streaming and includes comprehensive risk management features.",
    tech: ["React", "Node.js", "WebSocket", "PostgreSQL", "Redis", "Chart.js"],
    features: [
      "Real-time stock price updates via WebSocket",
      "Advanced order types (market, limit, stop-loss, bracket)",
      "Interactive portfolio dashboard with P&L tracking",
      "Live market depth and order book visualization",
      "Watchlist management and alerts system"
    ],
    github: "https://github.com/atithi4dev/zerodha-clone",
    demo: "https://zerodha-clone-demo.vercel.app",
    image: "/api/placeholder/600/400",
    status: "Active Development",
    version: "v1",
    category: "FinTech"
  }
];
