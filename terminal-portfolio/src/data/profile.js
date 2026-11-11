import {
  BrainCircuit,
  Building2,
  Database,
  Factory,
  Layers,
  Thermometer,
} from 'lucide-react'

export const USER = 'sidnelson_gubert'
export const HOST = 'server'

export const links = {
  github: 'https://github.com/sidgubert',
  linkedin: 'https://linkedin.com/in/sidnelson-gubert-1a7b261b1',
  trailhead: 'https://www.salesforce.com/trailblazer/gubert',
  email: 'sidgubert@gmail.com',
  cv: './CV_Sidnelson_Gubert.pdf',
}

export const bootLines = [
  { tag: 'OK', text: 'Mounting /dev/experience ............. 10+ years' },
  { tag: 'OK', text: 'Loading modules: node · typescript · python · react' },
  { tag: 'OK', text: 'Bridging industrial_automation <-> ai_agents' },
  { tag: 'OK', text: 'Starting mcp-server.service' },
  { tag: 'INFO', text: 'Profile ready. Rendering interface...' },
]

export const systemInfo = [
  { key: 'OS', value: 'Engineer/Researcher Hybrid x86_64' },
  { key: 'Host', value: 'IFBA · PPGESP' },
  { key: 'Degree', value: 'Mestrando em Engenharia de Sistemas e Produtos' },
  { key: 'Focus', value: 'Sistemas computacionais · Controle · Produtos' },
  { key: 'Kernel', value: 'Gestão de Manutenção (alto nível) + Eng. de Software' },
  { key: 'Research', value: 'Supervisão de dados industriais + detecção de anomalias (ML)' },
  { key: 'Shell', value: 'TypeScript / Python' },
  { key: 'Uptime', value: '10+ anos entre chão de fábrica e software' },
  { key: 'Location', value: 'Vitória da Conquista, BA — Brasil' },
]

export const techStack = [
  {
    dir: 'ai_expert_systems',
    label: 'AI & Expert Systems',
    icon: BrainCircuit,
    primary: true,
    items: [
      {
        name: 'Model Context Protocol (MCP)',
        desc: 'Servidores MCP que expõem ferramentas, dados e contexto de forma padronizada para agentes LLM.',
      },
      {
        name: 'Semantic Caching (Qdrant)',
        desc: 'Cache vetorial por similaridade semântica para cortar latência e custo de inferência.',
      },
      {
        name: 'AI Agents (Code Mode)',
        desc: 'Agentes que escrevem e executam código para orquestrar ferramentas com precisão.',
      },
    ],
  },
  {
    dir: 'core',
    label: 'Core',
    icon: Layers,
    items: ['Node.js', 'TypeScript', 'Python', 'React', 'Tailwind CSS'],
  },
  {
    dir: 'infra_data',
    label: 'Infra / Data',
    icon: Database,
    items: ['Docker', 'PostgreSQL', 'Prisma ORM', 'Redis'],
  },
  {
    dir: 'enterprise',
    label: 'Enterprise',
    icon: Building2,
    items: ['Ecossistema Salesforce', 'Salesforce Admin', 'Trailhead Ranger'],
  },
]

export const deployments = [
  {
    service: 'plantabot.service',
    name: 'PlantaBot · Supervisório Especialista',
    icon: Factory,
    status: 'active (running)',
    pid: 1024,
    repo: 'https://github.com/sidgubert/supervisorio-especialista',
    summary:
      'Sistema especialista conversacional para supervisão e manutenção de planta industrial, com LLMs locais via Ollama.',
    features: [
      'Ferramentas MCP para telemetria, alarmes e ordens de serviço',
      'Cache semântico vetorial (SentenceTransformer + ChromaDB)',
      'Guardrails de escopo e persona especialista industrial',
      'Validação automatizada com LLM-as-a-Judge',
    ],
    tags: ['Python', 'Ollama', 'MCP', 'ChromaDB', 'PostgreSQL', 'Docker'],
    activity: [3, 5, 4, 7, 6, 8, 5, 9, 7, 6, 8, 10, 7, 9, 8, 6, 9, 11, 8, 10, 9, 12, 10, 11],
  },
  {
    service: 'sf-connector.service',
    name: 'Salesforce Legacy Connector',
    icon: Building2,
    status: 'active (running)',
    pid: 2048,
    repo: 'https://github.com/sidgubert/salesforce-legacy-connector',
    summary:
      'Middleware bidirecional em Node.js para sincronização resiliente entre Salesforce (CDC, JWT) e ERP legado SOAP.',
    features: [
      'Sincronização bidirecional: Change Data Capture e poller com checkpoint',
      'Resiliência a falhas, filas BullMQ + Redis e garantia de idempotência',
      'Autenticação OAuth 2.0 JWT Bearer Flow e mapeamento em PostgreSQL (Prisma)',
      'Simulação de ERP SOAP instável para testes de latência e concorrência',
    ],
    tags: ['Node.js', 'TypeScript', 'Salesforce', 'Fastify', 'BullMQ', 'PostgreSQL', 'Docker'],
    activity: [4, 6, 5, 8, 7, 9, 6, 10, 8, 7, 9, 11, 8, 10, 9, 7, 10, 12, 9, 11, 10, 13, 11, 12],
  },
  {
    service: 'thermal-iot.service',
    name: 'Automação & IoT',
    icon: Thermometer,
    status: 'active (monitoring)',
    pid: 4096,
    repo: 'https://github.com/sidgubert/TCC_Da-Opera-o-Anal-gica-ao-Controle-Computacional-Estudo-de-Caso-da-Transforma-o-Digital-da-Cadeia',
    repoLabel: 'sidgubert/tcc-cadeia-de-frio',
    summary: 'Monitoramento térmico industrial em campo, do sensor ao dado.',
    features: [
      'Implantação de controladores',
      'Malhas de monitoramento térmico industrial',
      'Telemetria TC900E Log via TCP 485',
    ],
    tags: ['IoT', 'TC900E Log', 'TCP 485', 'Cadeia de frio'],
    activity: [6, 6, 7, 6, 7, 7, 6, 8, 7, 7, 6, 7, 8, 7, 6, 7, 7, 8, 7, 6, 7, 7, 8, 7],
  },
]

export const personalInterests = {
  sports: ['Jiu-Jitsu', 'PPL Weightlifting'],
  music: ['Heavy Metal', 'Death Metal'],
  aesthetics: ['Old School Tattoos'],
}

