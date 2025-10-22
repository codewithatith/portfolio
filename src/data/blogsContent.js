export const blogs = [
  {
    id: 1,
    title: "Building Redis from Scratch: RESP Protocol & Persistence",
    slug: "building-redis-from-scratch",
    excerpt: "Deep dive into implementing Redis from first principles, covering the RESP protocol, data structures, and persistence mechanisms.",
    content: `# Building Redis from Scratch: RESP Protocol & Persistence

## Introduction

Redis is one of the most popular in-memory databases, but have you ever wondered how it works under the hood? In this deep dive, I'll walk you through building a Redis-compatible server from scratch in Go.

## The RESP Protocol

Redis uses a simple but effective protocol called RESP (Redis Serialization Protocol). Let's implement it:

\`\`\`go
type RESPType int

const (
    SimpleString RESPType = iota
    Error
    Integer
    BulkString
    Array
)

type RESPValue struct {
    Type  RESPType
    Value interface{}
}
\`\`\`

## Data Structures

The core of Redis lies in its data structures. Here's how we implement them:

\`\`\`go
type RedisDB struct {
    data map[string]interface{}
    mu   sync.RWMutex
}

func (db *RedisDB) Set(key string, value string) {
    db.mu.Lock()
    defer db.mu.Unlock()
    db.data[key] = value
}
\`\`\`

## Persistence with RDB

Implementing RDB snapshots for persistence:

\`\`\`go
func (db *RedisDB) SaveRDB(filename string) error {
    file, err := os.Create(filename)
    if err != nil {
        return err
    }
    defer file.Close()
    
    encoder := gob.NewEncoder(file)
    return encoder.Encode(db.data)
}
\`\`\`

## Conclusion

Building Redis from scratch teaches you about protocol design, data structures, and persistence. The full implementation is available on GitHub.`,
    readTime: "12 min read",
    difficulty: "Expert",
    tags: ["Go", "Database", "Protocol Design", "Systems Programming"],
    date: "2024-01-15",
    featured: true
  },
  {
    id: 2,
    title: "Microservices Communication Patterns: Event-Driven Architecture",
    slug: "microservices-communication-patterns",
    excerpt: "Exploring different communication patterns in microservices architecture, from synchronous to asynchronous messaging.",
    content: `# Microservices Communication Patterns: Event-Driven Architecture

## The Challenge of Distributed Systems

Microservices architecture brings complexity in communication. How do services talk to each other reliably?

## Synchronous vs Asynchronous

### Synchronous Communication
- **HTTP/REST**: Simple but creates tight coupling
- **gRPC**: High-performance, type-safe RPC
- **GraphQL**: Flexible query language

\`\`\`javascript
// REST API call
const user = await fetch('/api/users/123');
const orders = await fetch('/api/orders?userId=123');
\`\`\`

### Asynchronous Communication
- **Message Queues**: RabbitMQ, Apache Kafka
- **Event Streaming**: Real-time data processing
- **Pub/Sub**: Decoupled communication

\`\`\`go
// Event-driven pattern
type UserCreatedEvent struct {
    UserID    string    \`json:"user_id"\`
    Email     string    \`json:"email"\`
    CreatedAt time.Time \`json:"created_at"\`
}

func (s *UserService) CreateUser(user *User) error {
    // Create user logic
    event := &UserCreatedEvent{
        UserID:    user.ID,
        Email:     user.Email,
        CreatedAt: time.Now(),
    }
    return s.eventBus.Publish("user.created", event)
}
\`\`\`

## Event Sourcing

Store events as the source of truth:

\`\`\`go
type EventStore interface {
    Append(streamID string, events []Event) error
    GetEvents(streamID string) ([]Event, error)
}

type Aggregate struct {
    ID      string
    Version int
    Events  []Event
}
\`\`\`

## CQRS (Command Query Responsibility Segregation)

Separate read and write models:

\`\`\`go
// Command side
type CreateUserCommand struct {
    Email string
    Name  string
}

// Query side
type UserView struct {
    ID    string
    Email string
    Name  string
}
\`\`\`

## Circuit Breaker Pattern

Handle failures gracefully:

\`\`\`go
type CircuitBreaker struct {
    maxFailures int
    timeout     time.Duration
    state       State
}

func (cb *CircuitBreaker) Call(fn func() error) error {
    if cb.state == Open {
        return ErrCircuitOpen
    }
    // Implementation details...
}
\`\`\`

## Conclusion

Event-driven architecture provides scalability and resilience for microservices.`,
    readTime: "15 min read",
    difficulty: "Expert",
    tags: ["Microservices", "Event-Driven", "Architecture", "Go"],
    date: "2024-01-20",
    featured: true
  },
  {
    id: 3,
    title: "Database Sharding Strategies: Horizontal Partitioning at Scale",
    slug: "database-sharding-strategies",
    excerpt: "Comprehensive guide to database sharding, covering different strategies, challenges, and implementation patterns.",
    content: `# Database Sharding Strategies: Horizontal Partitioning at Scale

## What is Database Sharding?

Sharding is the process of splitting a large database into smaller, more manageable pieces called shards.

## Sharding Strategies

### 1. Range-Based Sharding

Partition data based on ranges:

\`\`\`sql
-- Shard 1: user_id 1-1000000
-- Shard 2: user_id 1000001-2000000
-- Shard 3: user_id 2000001-3000000
\`\`\`

### 2. Hash-Based Sharding

Use consistent hashing:

\`\`\`go
func getShard(userID string, numShards int) int {
    hash := sha256.Sum256([]byte(userID))
    return int(binary.BigEndian.Uint64(hash[:8])) % numShards
}
\`\`\`

### 3. Directory-Based Sharding

Maintain a lookup table:

\`\`\`go
type ShardDirectory struct {
    shards map[string]string // key -> shard
    mu     sync.RWMutex
}

func (sd *ShardDirectory) GetShard(key string) string {
    sd.mu.RLock()
    defer sd.mu.RUnlock()
    return sd.shards[key]
}
\`\`\`

## Implementation Patterns

### Shard Manager

\`\`\`go
type ShardManager struct {
    shards []*Shard
    router ShardRouter
}

func (sm *ShardManager) Write(key string, value interface{}) error {
    shard := sm.router.GetShard(key)
    return shard.Write(key, value)
}
\`\`\`

### Cross-Shard Queries

\`\`\`go
func (sm *ShardManager) QueryAll(query string) ([]Result, error) {
    var results []Result
    var wg sync.WaitGroup
    var mu sync.Mutex
    
    for _, shard := range sm.shards {
        wg.Add(1)
        go func(s *Shard) {
            defer wg.Done()
            result, err := s.Query(query)
            if err == nil {
                mu.Lock()
                results = append(results, result...)
                mu.Unlock()
            }
        }(shard)
    }
    
    wg.Wait()
    return results, nil
}
\`\`\`

## Challenges and Solutions

### 1. Rebalancing

\`\`\`go
func (sm *ShardManager) Rebalance() error {
    // Analyze shard sizes
    // Move data between shards
    // Update routing table
}
\`\`\`

### 2. Cross-Shard Transactions

Use two-phase commit or saga pattern:

\`\`\`go
type Saga struct {
    steps []SagaStep
}

func (s *Saga) Execute() error {
    for i, step := range s.steps {
        if err := step.Execute(); err != nil {
            // Compensate previous steps
            return s.compensate(i)
        }
    }
    return nil
}
\`\`\`

## Monitoring and Metrics

\`\`\`go
type ShardMetrics struct {
    ShardID     string
    QueryCount  int64
    Latency     time.Duration
    ErrorRate   float64
    DataSize    int64
}
\`\`\`

## Conclusion

Sharding is essential for scaling databases, but requires careful planning and implementation.`,
    readTime: "18 min read",
    difficulty: "Expert",
    tags: ["Database", "Sharding", "Scalability", "Go"],
    date: "2024-01-25",
    featured: true
  },
  {
    id: 4,
    title: "API Rate Limiting: Token Bucket vs Sliding Window",
    slug: "api-rate-limiting-algorithms",
    excerpt: "Deep dive into rate limiting algorithms, implementation patterns, and distributed rate limiting strategies.",
    content: `# API Rate Limiting: Token Bucket vs Sliding Window

## Why Rate Limiting Matters

Rate limiting protects your APIs from abuse and ensures fair resource allocation.

## Token Bucket Algorithm

### Concept
- Bucket has capacity C tokens
- Tokens are added at rate R per second
- Request consumes 1 token
- Request rejected if no tokens available

### Implementation

\`\`\`go
type TokenBucket struct {
    capacity    int
    tokens      int
    lastRefill  time.Time
    refillRate  int // tokens per second
    mu          sync.Mutex
}

func (tb *TokenBucket) Allow() bool {
    tb.mu.Lock()
    defer tb.mu.Unlock()
    
    now := time.Now()
    elapsed := now.Sub(tb.lastRefill)
    tokensToAdd := int(elapsed.Seconds()) * tb.refillRate
    
    tb.tokens = min(tb.capacity, tb.tokens+tokensToAdd)
    tb.lastRefill = now
    
    if tb.tokens > 0 {
        tb.tokens--
        return true
    }
    return false
}
\`\`\`

## Sliding Window Algorithm

### Concept
- Track requests in time windows
- More accurate than fixed windows
- Better for burst handling

### Implementation

\`\`\`go
type SlidingWindow struct {
    requests []time.Time
    limit    int
    window   time.Duration
    mu       sync.Mutex
}

func (sw *SlidingWindow) Allow() bool {
    sw.mu.Lock()
    defer sw.mu.Unlock()
    
    now := time.Now()
    cutoff := now.Add(-sw.window)
    
    // Remove old requests
    var validRequests []time.Time
    for _, req := range sw.requests {
        if req.After(cutoff) {
            validRequests = append(validRequests, req)
        }
    }
    sw.requests = validRequests
    
    if len(sw.requests) < sw.limit {
        sw.requests = append(sw.requests, now)
        return true
    }
    return false
}
\`\`\`

## Distributed Rate Limiting

### Redis-based Implementation

\`\`\`go
type DistributedRateLimiter struct {
    redis  *redis.Client
    prefix string
}

func (drl *DistributedRateLimiter) Allow(key string, limit int, window time.Duration) (bool, error) {
    script := \`
        local key = KEYS[1]
        local limit = tonumber(ARGV[1])
        local window = tonumber(ARGV[2])
        local now = tonumber(ARGV[3])
        
        local current = redis.call('ZCARD', key)
        if current < limit then
            redis.call('ZADD', key, now, now)
            redis.call('EXPIRE', key, window)
            return 1
        else
            return 0
        end
    \`
    
    result, err := drl.redis.Eval(script, []string{drl.prefix + key}, limit, window.Seconds(), time.Now().Unix()).Result()
    if err != nil {
        return false, err
    }
    
    return result.(int64) == 1, nil
}
\`\`\`

## Advanced Patterns

### Adaptive Rate Limiting

\`\`\`go
type AdaptiveRateLimiter struct {
    baseLimit    int
    currentLimit int
    successRate  float64
    targetRate   float64
}

func (arl *AdaptiveRateLimiter) UpdateMetrics(success bool) {
    // Update success rate
    // Adjust limit based on performance
    if arl.successRate > arl.targetRate {
        arl.currentLimit = min(arl.currentLimit+1, arl.baseLimit*2)
    } else {
        arl.currentLimit = max(arl.currentLimit-1, 1)
    }
}
\`\`\`

### Rate Limiting by User Tier

\`\`\`go
type TieredRateLimiter struct {
    tiers map[string]RateLimit
}

type RateLimit struct {
    Requests int
    Window   time.Duration
}

func (trl *TieredRateLimiter) GetLimit(userTier string) RateLimit {
    if limit, exists := trl.tiers[userTier]; exists {
        return limit
    }
    return trl.tiers["default"]
}
\`\`\`

## Monitoring and Metrics

\`\`\`go
type RateLimitMetrics struct {
    TotalRequests    int64
    AllowedRequests  int64
    RejectedRequests int64
    AverageLatency   time.Duration
}
\`\`\`

## Conclusion

Choose the right algorithm based on your requirements. Token bucket for burst handling, sliding window for accuracy.`,
    readTime: "14 min read",
    difficulty: "Advanced",
    tags: ["Rate Limiting", "Algorithms", "Go", "Redis"],
    date: "2024-01-30",
    featured: false
  },
  {
    id: 5,
    title: "Caching Strategies: From L1 to Distributed Caches",
    slug: "caching-strategies-comprehensive",
    excerpt: "Complete guide to caching at different levels, from CPU caches to distributed Redis clusters.",
    content: `# Caching Strategies: From L1 to Distributed Caches

## The Caching Hierarchy

Understanding caching at every level of your system.

## CPU Cache Levels

### L1 Cache (32KB)
- Fastest access (1-2 cycles)
- Separate for instructions and data
- Managed by hardware

### L2 Cache (256KB-1MB)
- Shared between cores
- 10-20 cycles access time
- Cache line size: 64 bytes

### L3 Cache (8-32MB)
- Shared across all cores
- 40-75 cycles access time
- Last level cache before main memory

## Application-Level Caching

### In-Memory Caching

\`\`\`go
type LRUCache struct {
    capacity int
    cache    map[string]*Node
    head     *Node
    tail     *Node
}

func (lru *LRUCache) Get(key string) (interface{}, bool) {
    if node, exists := lru.cache[key]; exists {
        lru.moveToHead(node)
        return node.value, true
    }
    return nil, false
}

func (lru *LRUCache) Set(key string, value interface{}) {
    if node, exists := lru.cache[key]; exists {
        node.value = value
        lru.moveToHead(node)
    } else {
        if len(lru.cache) >= lru.capacity {
            lru.removeTail()
        }
        newNode := &Node{key: key, value: value}
        lru.cache[key] = newNode
        lru.addToHead(newNode)
    }
}
\`\`\`

### Write-Through vs Write-Behind

\`\`\`go
// Write-Through: Write to cache and database simultaneously
func (c *Cache) WriteThrough(key string, value interface{}) error {
    c.memory.Set(key, value)
    return c.database.Set(key, value)
}

// Write-Behind: Write to cache immediately, database asynchronously
func (c *Cache) WriteBehind(key string, value interface{}) error {
    c.memory.Set(key, value)
    go func() {
        c.database.Set(key, value)
    }()
    return nil
}
\`\`\`

## Distributed Caching

### Redis Cluster

\`\`\`go
type RedisCluster struct {
    nodes []*RedisNode
    hash  *ConsistentHash
}

func (rc *RedisCluster) Set(key string, value interface{}) error {
    node := rc.hash.GetNode(key)
    return node.Set(key, value)
}

func (rc *RedisCluster) Get(key string) (interface{}, error) {
    node := rc.hash.GetNode(key)
    return node.Get(key)
}
\`\`\`

### Cache-Aside Pattern

\`\`\`go
func (s *Service) GetUser(userID string) (*User, error) {
    // Try cache first
    if user, found := s.cache.Get(userID); found {
        return user.(*User), nil
    }
    
    // Cache miss - fetch from database
    user, err := s.database.GetUser(userID)
    if err != nil {
        return nil, err
    }
    
    // Store in cache
    s.cache.Set(userID, user, 5*time.Minute)
    return user, nil
}
\`\`\`

## Cache Invalidation Strategies

### TTL (Time To Live)

\`\`\`go
type TTLCache struct {
    data map[string]CacheItem
    mu   sync.RWMutex
}

type CacheItem struct {
    Value     interface{}
    ExpiresAt time.Time
}

func (tc *TTLCache) Get(key string) (interface{}, bool) {
    tc.mu.RLock()
    defer tc.mu.RUnlock()
    
    item, exists := tc.data[key]
    if !exists || time.Now().After(item.ExpiresAt) {
        return nil, false
    }
    return item.Value, true
}
\`\`\`

### Event-Driven Invalidation

\`\`\`go
type CacheInvalidator struct {
    cache Cache
    bus   EventBus
}

func (ci *CacheInvalidator) HandleUserUpdated(event UserUpdatedEvent) {
    // Invalidate user-related cache entries
    ci.cache.Delete(fmt.Sprintf("user:%s", event.UserID))
    ci.cache.Delete(fmt.Sprintf("user:%s:profile", event.UserID))
}
\`\`\`

## Cache Warming Strategies

### Predictive Warming

\`\`\`go
func (s *Service) WarmCache() {
    // Pre-load frequently accessed data
    popularUsers := s.database.GetPopularUsers(100)
    for _, user := range popularUsers {
        s.cache.Set(fmt.Sprintf("user:%s", user.ID), user, 1*time.Hour)
    }
}
\`\`\`

### Lazy Loading with Background Refresh

\`\`\`go
func (s *Service) GetUserWithRefresh(userID string) (*User, error) {
    user, found := s.cache.Get(userID)
    if found {
        // Check if we need to refresh
        if s.shouldRefresh(userID) {
            go s.refreshUser(userID)
        }
        return user.(*User), nil
    }
    
    // Cache miss - fetch and cache
    return s.fetchAndCacheUser(userID)
}
\`\`\`

## Monitoring Cache Performance

\`\`\`go
type CacheMetrics struct {
    HitRate      float64
    MissRate     float64
    Evictions    int64
    MemoryUsage  int64
    AverageTTL   time.Duration
}
\`\`\`

## Conclusion

Effective caching requires understanding your data access patterns and choosing the right strategy for each level.`,
    readTime: "16 min read",
    difficulty: "Advanced",
    tags: ["Caching", "Performance", "Redis", "Memory Management"],
    date: "2024-02-05",
    featured: false
  },
  {
    id: 6,
    title: "Message Queue Patterns: Publisher-Subscriber vs Work Queues",
    slug: "message-queue-patterns",
    excerpt: "Exploring different message queue patterns, from simple pub/sub to complex event streaming architectures.",
    content: `# Message Queue Patterns: Publisher-Subscriber vs Work Queues

## Message Queues in Distributed Systems

Message queues enable asynchronous communication between services, providing decoupling and reliability.

## Publisher-Subscriber Pattern

### Concept
- Publishers send messages to topics
- Subscribers consume messages from topics
- Multiple subscribers can receive the same message

### Implementation with RabbitMQ

\`\`\`go
type Publisher struct {
    conn    *amqp.Connection
    channel *amqp.Channel
}

func (p *Publisher) Publish(topic string, message []byte) error {
    return p.channel.Publish(
        "events", // exchange
        topic,    // routing key
        false,    // mandatory
        false,    // immediate
        amqp.Publishing{
            ContentType: "application/json",
            Body:        message,
        },
    )
}

type Subscriber struct {
    conn    *amqp.Connection
    channel *amqp.Channel
}

func (s *Subscriber) Subscribe(topic string, handler func([]byte)) error {
    queue, err := s.channel.QueueDeclare("", false, true, true, false, nil)
    if err != nil {
        return err
    }
    
    err = s.channel.QueueBind(queue.Name, topic, "events", false, nil)
    if err != nil {
        return err
    }
    
    msgs, err := s.channel.Consume(queue.Name, "", true, false, false, false, nil)
    if err != nil {
        return err
    }
    
    go func() {
        for msg := range msgs {
            handler(msg.Body)
        }
    }()
    
    return nil
}
\`\`\`

## Work Queue Pattern

### Concept
- Tasks are distributed among workers
- Each message is processed by only one worker
- Load balancing across workers

### Implementation

\`\`\`go
type TaskQueue struct {
    conn    *amqp.Connection
    channel *amqp.Channel
}

func (tq *TaskQueue) EnqueueTask(task Task) error {
    body, err := json.Marshal(task)
    if err != nil {
        return err
    }
    
    return tq.channel.Publish(
        "",           // exchange
        "task_queue", // routing key
        false,        // mandatory
        false,        // immediate
        amqp.Publishing{
            DeliveryMode: amqp.Persistent,
            ContentType:  "application/json",
            Body:         body,
        },
    )
}

type Worker struct {
    conn    *amqp.Connection
    channel *amqp.Channel
}

func (w *Worker) StartProcessing() error {
    msgs, err := w.channel.Consume(
        "task_queue", // queue
        "",           // consumer
        false,        // auto-ack
        false,        // exclusive
        false,        // no-local
        false,        // no-wait
        nil,          // args
    )
    if err != nil {
        return err
    }
    
    go func() {
        for msg := range msgs {
            var task Task
            if err := json.Unmarshal(msg.Body, &task); err != nil {
                log.Printf("Error decoding task: %v", err)
                msg.Nack(false, false)
                continue
            }
            
            if err := w.processTask(task); err != nil {
                log.Printf("Error processing task: %v", err)
                msg.Nack(false, true) // requeue
                continue
            }
            
            msg.Ack(false)
        }
    }()
    
    return nil
}
\`\`\`

## Event Streaming with Apache Kafka

### Producer

\`\`\`go
type KafkaProducer struct {
    producer kafka.Producer
}

func (kp *KafkaProducer) SendEvent(topic string, event Event) error {
    data, err := json.Marshal(event)
    if err != nil {
        return err
    }
    
    return kp.producer.Produce(&kafka.Message{
        TopicPartition: kafka.TopicPartition{
            Topic:     &topic,
            Partition: kafka.PartitionAny,
        },
        Value: data,
    }, nil)
}
\`\`\`

### Consumer

\`\`\`go
type KafkaConsumer struct {
    consumer kafka.Consumer
}

func (kc *KafkaConsumer) ConsumeEvents(topic string, handler func(Event)) error {
    kc.consumer.SubscribeTopics([]string{topic}, nil)
    
    for {
        msg, err := kc.consumer.ReadMessage(-1)
        if err != nil {
            return err
        }
        
        var event Event
        if err := json.Unmarshal(msg.Value, &event); err != nil {
            log.Printf("Error decoding event: %v", err)
            continue
        }
        
        handler(event)
    }
}
\`\`\`

## Dead Letter Queues

### Handling Failed Messages

\`\`\`go
type DeadLetterHandler struct {
    dlqChannel *amqp.Channel
    retryCount int
}

func (dlh *DeadLetterHandler) HandleFailedMessage(msg amqp.Delivery) error {
    retryCount := dlh.getRetryCount(msg.Headers)
    
    if retryCount < dlh.retryCount {
        // Retry with exponential backoff
        delay := time.Duration(math.Pow(2, float64(retryCount))) * time.Second
        time.Sleep(delay)
        
        return dlh.retryMessage(msg, retryCount+1)
    } else {
        // Send to dead letter queue
        return dlh.sendToDLQ(msg)
    }
}
\`\`\`

## Message Ordering and Partitioning

### Kafka Partitioning Strategy

\`\`\`go
func (kp *KafkaProducer) SendOrderedEvent(topic string, key string, event Event) error {
    // Use key-based partitioning for ordering
    return kp.producer.Produce(&kafka.Message{
        TopicPartition: kafka.TopicPartition{
            Topic:     &topic,
            Partition: kafka.PartitionAny,
        },
        Key:   []byte(key),
        Value: event,
    }, nil)
}
\`\`\`

## Monitoring and Metrics

\`\`\`go
type QueueMetrics struct {
    MessagesProduced int64
    MessagesConsumed int64
    ProcessingTime   time.Duration
    ErrorRate        float64
    QueueDepth       int64
}
\`\`\`

## Conclusion

Choose the right pattern based on your requirements: pub/sub for broadcasting, work queues for task distribution, event streaming for real-time processing.`,
    readTime: "17 min read",
    difficulty: "Advanced",
    tags: ["Message Queues", "RabbitMQ", "Kafka", "Event Streaming"],
    date: "2024-02-10",
    featured: false
  },
  {
    id: 7,
    title: "Database Connection Pooling: Optimizing Resource Usage",
    slug: "database-connection-pooling",
    excerpt: "Deep dive into database connection pooling strategies, from basic pools to advanced connection management.",
    content: `# Database Connection Pooling: Optimizing Resource Usage

## The Problem with Database Connections

Database connections are expensive to create and maintain. Connection pooling solves this by reusing connections.

## Basic Connection Pool

\`\`\`go
type ConnectionPool struct {
    connections chan *sql.DB
    factory     func() (*sql.DB, error)
    maxSize     int
    mu          sync.RWMutex
}

func NewConnectionPool(factory func() (*sql.DB, error), maxSize int) *ConnectionPool {
    return &ConnectionPool{
        connections: make(chan *sql.DB, maxSize),
        factory:     factory,
        maxSize:     maxSize,
    }
}

func (cp *ConnectionPool) Get() (*sql.DB, error) {
    select {
    case conn := <-cp.connections:
        return conn, nil
    default:
        return cp.factory()
    }
}

func (cp *ConnectionPool) Put(conn *sql.DB) {
    select {
    case cp.connections <- conn:
    default:
        conn.Close()
    }
}
\`\`\`

## Advanced Pool with Health Checks

\`\`\`go
type HealthyConnectionPool struct {
    connections chan *PooledConnection
    factory     func() (*sql.DB, error)
    maxSize     int
    healthCheck time.Duration
    stopCh      chan struct{}
}

type PooledConnection struct {
    db        *sql.DB
    createdAt time.Time
    lastUsed  time.Time
}

func (hcp *HealthyConnectionPool) Get() (*sql.DB, error) {
    for {
        select {
        case pooledConn := <-hcp.connections:
            if hcp.isHealthy(pooledConn) {
                pooledConn.lastUsed = time.Now()
                return pooledConn.db, nil
            } else {
                pooledConn.db.Close()
                continue
            }
        default:
            return hcp.factory()
        }
    }
}

func (hcp *HealthyConnectionPool) isHealthy(pc *PooledConnection) bool {
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
    defer cancel()
    
    return pc.db.PingContext(ctx) == nil
}
\`\`\`

## Connection Pool Configuration

\`\`\`go
type PoolConfig struct {
    MaxOpenConns    int           // Maximum open connections
    MaxIdleConns    int           // Maximum idle connections
    ConnMaxLifetime time.Duration // Connection max lifetime
    ConnMaxIdleTime time.Duration // Connection max idle time
}

func ConfigurePool(db *sql.DB, config PoolConfig) {
    db.SetMaxOpenConns(config.MaxOpenConns)
    db.SetMaxIdleConns(config.MaxIdleConns)
    db.SetConnMaxLifetime(config.ConnMaxLifetime)
    db.SetConnMaxIdleTime(config.ConnMaxIdleTime)
}
\`\`\`

## Read/Write Splitting

\`\`\`go
type ReadWritePool struct {
    writePool *ConnectionPool
    readPools []*ConnectionPool
    roundRobin int
    mu        sync.Mutex
}

func (rw *ReadWritePool) GetWriteConnection() (*sql.DB, error) {
    return rw.writePool.Get()
}

func (rw *ReadWritePool) GetReadConnection() (*sql.DB, error) {
    rw.mu.Lock()
    defer rw.mu.Unlock()
    
    pool := rw.readPools[rw.roundRobin%len(rw.readPools)]
    rw.roundRobin++
    
    return pool.Get()
}
\`\`\`

## Connection Pool Monitoring

\`\`\`go
type PoolMetrics struct {
    ActiveConnections  int
    IdleConnections    int
    TotalConnections   int
    WaitTime          time.Duration
    ConnectionErrors   int64
    PoolHits          int64
    PoolMisses        int64
}

func (cp *ConnectionPool) GetMetrics() PoolMetrics {
    return PoolMetrics{
        ActiveConnections: cp.getActiveCount(),
        IdleConnections:   len(cp.connections),
        TotalConnections:  cp.getTotalCount(),
        // ... other metrics
    }
}
\`\`\`

## Distributed Connection Pooling

### Redis Connection Pool

\`\`\`go
type RedisPool struct {
    pools []*redis.Pool
    hash  *ConsistentHash
}

func (rp *RedisPool) GetConnection(key string) *redis.Conn {
    node := rp.hash.GetNode(key)
    return rp.pools[node].Get()
}

func (rp *RedisPool) PutConnection(key string, conn *redis.Conn) {
    node := rp.hash.GetNode(key)
    rp.pools[node].Put(conn)
}
\`\`\`

## Connection Pool Best Practices

### 1. Size Configuration

\`\`\`go
// Calculate optimal pool size
func CalculatePoolSize(cpuCores int, dbConnections int) int {
    // Rule of thumb: 2-3 connections per CPU core
    optimalSize := cpuCores * 2
    
    // Don't exceed database connection limit
    if optimalSize > dbConnections {
        optimalSize = dbConnections
    }
    
    return optimalSize
}
\`\`\`

### 2. Connection Validation

\`\`\`go
func (cp *ConnectionPool) validateConnection(conn *sql.DB) bool {
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
    defer cancel()
    
    return conn.PingContext(ctx) == nil
}
\`\`\`

### 3. Graceful Shutdown

\`\`\`go
func (cp *ConnectionPool) Shutdown() error {
    close(cp.stopCh)
    
    // Wait for all connections to be returned
    for len(cp.connections) > 0 {
        select {
        case conn := <-cp.connections:
            conn.Close()
        case <-time.After(5 * time.Second):
            return fmt.Errorf("timeout waiting for connections to be returned")
        }
    }
    
    return nil
}
\`\`\`

## Conclusion

Proper connection pooling is crucial for database performance. Configure pools based on your workload and monitor metrics continuously.`,
    readTime: "13 min read",
    difficulty: "Advanced",
    tags: ["Database", "Connection Pooling", "Performance", "Go"],
    date: "2024-02-15",
    featured: false
  },
  {
    id: 8,
    title: "API Gateway Patterns: Routing, Authentication, and Rate Limiting",
    slug: "api-gateway-patterns",
    excerpt: "Comprehensive guide to API gateway implementation, covering routing strategies, authentication, and cross-cutting concerns.",
    content: `# API Gateway Patterns: Routing, Authentication, and Rate Limiting

## What is an API Gateway?

An API gateway is a single entry point for all client requests, handling routing, authentication, rate limiting, and other cross-cutting concerns.

## Basic Gateway Architecture

\`\`\`go
type APIGateway struct {
    router      *gin.Engine
    services    map[string]*Service
    auth        AuthProvider
    rateLimiter RateLimiter
    logger      Logger
}

type Service struct {
    Name    string
    BaseURL string
    Health  string
}
\`\`\`

## Request Routing

### Path-Based Routing

\`\`\`go
func (gw *APIGateway) setupRouting() {
    // User service
    gw.router.Group("/api/v1/users").
        Use(gw.authMiddleware()).
        Use(gw.rateLimitMiddleware()).
        Any("/*path", gw.proxyToService("user-service"))
    
    // Order service
    gw.router.Group("/api/v1/orders").
        Use(gw.authMiddleware()).
        Use(gw.rateLimitMiddleware()).
        Any("/*path", gw.proxyToService("order-service"))
}
\`\`\`

### Header-Based Routing

\`\`\`go
func (gw *APIGateway) routeByHeader(c *gin.Context) {
    serviceName := c.GetHeader("X-Service-Name")
    if serviceName == "" {
        c.JSON(400, gin.H{"error": "X-Service-Name header required"})
        return
    }
    
    service, exists := gw.services[serviceName]
    if !exists {
        c.JSON(404, gin.H{"error": "Service not found"})
        return
    }
    
    gw.proxyRequest(c, service)
}
\`\`\`

## Authentication and Authorization

### JWT Authentication

\`\`\`go
func (gw *APIGateway) authMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.JSON(401, gin.H{"error": "Authorization header required"})
            c.Abort()
            return
        }
        
        // Remove "Bearer " prefix
        if strings.HasPrefix(token, "Bearer ") {
            token = token[7:]
        }
        
        claims, err := gw.auth.ValidateToken(token)
        if err != nil {
            c.JSON(401, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }
        
        c.Set("user_id", claims.UserID)
        c.Set("roles", claims.Roles)
        c.Next()
    }
}
\`\`\`

### Role-Based Authorization

\`\`\`go
func (gw *APIGateway) requireRole(role string) gin.HandlerFunc {
    return func(c *gin.Context) {
        roles, exists := c.Get("roles")
        if !exists {
            c.JSON(403, gin.H{"error": "No roles found"})
            c.Abort()
            return
        }
        
        userRoles := roles.([]string)
        if !contains(userRoles, role) {
            c.JSON(403, gin.H{"error": "Insufficient permissions"})
            c.Abort()
            return
        }
        
        c.Next()
    }
}
\`\`\`

## Rate Limiting

### Per-User Rate Limiting

\`\`\`go
func (gw *APIGateway) rateLimitMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        userID := c.GetString("user_id")
        if userID == "" {
            userID = c.ClientIP() // Fallback to IP
        }
        
        allowed, err := gw.rateLimiter.Allow(userID, 100, time.Minute)
        if err != nil {
            c.JSON(500, gin.H{"error": "Rate limiter error"})
            c.Abort()
            return
        }
        
        if !allowed {
            c.JSON(429, gin.H{"error": "Rate limit exceeded"})
            c.Abort()
            return
        }
        
        c.Next()
    }
}
\`\`\`

## Service Discovery Integration

\`\`\`go
type ServiceRegistry struct {
    services map[string][]*ServiceInstance
    mu       sync.RWMutex
}

type ServiceInstance struct {
    ID       string
    Address  string
    Port     int
    Health   string
    Metadata map[string]string
}

func (sr *ServiceRegistry) GetService(name string) (*ServiceInstance, error) {
    sr.mu.RLock()
    defer sr.mu.RUnlock()
    
    instances, exists := sr.services[name]
    if !exists || len(instances) == 0 {
        return nil, fmt.Errorf("no healthy instances for service %s", name)
    }
    
    // Load balancing - round robin
    instance := instances[rand.Intn(len(instances))]
    return instance, nil
}
\`\`\`

## Circuit Breaker Pattern

\`\`\`go
type CircuitBreaker struct {
    name           string
    maxFailures    int
    timeout        time.Duration
    state          State
    failureCount   int
    lastFailTime   time.Time
    mu             sync.RWMutex
}

type State int

const (
    Closed State = iota
    Open
    HalfOpen
)

func (cb *CircuitBreaker) Call(fn func() error) error {
    cb.mu.Lock()
    defer cb.mu.Unlock()
    
    if cb.state == Open {
        if time.Since(cb.lastFailTime) > cb.timeout {
            cb.state = HalfOpen
        } else {
            return fmt.Errorf("circuit breaker is open")
        }
    }
    
    err := fn()
    if err != nil {
        cb.failureCount++
        cb.lastFailTime = time.Now()
        
        if cb.failureCount >= cb.maxFailures {
            cb.state = Open
        }
        return err
    }
    
    // Success - reset failure count
    cb.failureCount = 0
    cb.state = Closed
    return nil
}
\`\`\`

## Request/Response Transformation

\`\`\`go
func (gw *APIGateway) transformRequest(c *gin.Context) {
    // Add common headers
    c.Request.Header.Set("X-Request-ID", generateRequestID())
    c.Request.Header.Set("X-User-ID", c.GetString("user_id"))
    
    // Log request
    gw.logger.Info("Incoming request",
        "method", c.Request.Method,
        "path", c.Request.URL.Path,
        "user_id", c.GetString("user_id"),
        "request_id", c.GetHeader("X-Request-ID"),
    )
}

func (gw *APIGateway) transformResponse(c *gin.Context) {
    // Add response headers
    c.Header("X-Response-Time", time.Since(c.GetTime("start_time")).String())
    
    // Log response
    gw.logger.Info("Outgoing response",
        "status", c.Writer.Status(),
        "response_time", time.Since(c.GetTime("start_time")),
    )
}
\`\`\`

## Monitoring and Metrics

\`\`\`go
type GatewayMetrics struct {
    RequestCount    int64
    ErrorCount      int64
    ResponseTime    time.Duration
    ActiveConnections int64
    CircuitBreakerState map[string]State
}

func (gw *APIGateway) collectMetrics() GatewayMetrics {
    return GatewayMetrics{
        RequestCount:    gw.getRequestCount(),
        ErrorCount:      gw.getErrorCount(),
        ResponseTime:    gw.getAverageResponseTime(),
        ActiveConnections: gw.getActiveConnections(),
        CircuitBreakerState: gw.getCircuitBreakerStates(),
    }
}
\`\`\`

## Conclusion

API gateways provide a centralized way to handle cross-cutting concerns. Choose patterns based on your specific requirements.`,
    readTime: "19 min read",
    difficulty: "Expert",
    tags: ["API Gateway", "Microservices", "Authentication", "Go"],
    date: "2024-02-20",
    featured: true
  },
]