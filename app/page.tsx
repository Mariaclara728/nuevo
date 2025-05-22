"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  CheckCircle,
  Play,
  Shield,
  Clock,
  Star,
  Lock,
  BookOpen,
  MessageCircle,
  ArrowRight,
  X,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Gift,
  Users,
  Bell,
  CheckCircle2,
  Sparkles,
  Brain,
  Zap,
  Heart,
  Target,
  Lightbulb,
  Flame,
} from "lucide-react"

// Componente de contador regressivo
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 11,
    minutes: 45,
    seconds: 19,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime

        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center gap-3">
      {[
        { value: timeLeft.days.toString().padStart(2, "0"), label: "Dias" },
        { value: timeLeft.hours.toString().padStart(2, "0"), label: "Horas" },
        { value: timeLeft.minutes.toString().padStart(2, "0"), label: "Minutos" },
        { value: timeLeft.seconds.toString().padStart(2, "0"), label: "Segundos" },
      ].map((unit, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="relative bg-[#001233] border border-blue-800 rounded px-3 py-1 text-xl font-bold text-[#ffd700] w-14 h-14 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
            <span className="relative z-10">{unit.value}</span>
          </div>
          <span className="text-xs text-blue-300 mt-1">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

// Componente de notificação de compra recente
const RecentPurchaseNotification = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed bottom-24 left-4 z-50 max-w-xs bg-blue-900/90 border border-blue-800 rounded-lg p-3 shadow-lg animate-slide-in-left">
      <div className="flex items-start">
        <div className="bg-blue-800 rounded-full p-2 mr-3">
          <Bell className="h-5 w-5 text-[#ffd700]" />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-medium">
            <span className="text-[#ffd700]">Carlos de São Paulo</span> acabou de adquirir o Manual Estoico
          </p>
          <p className="text-blue-300 text-xs mt-1">há 2 minutos atrás</p>
        </div>
        <button onClick={onClose} className="text-blue-400 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// Componente de vagas limitadas
const LimitedSpotsIndicator = ({ spotsLeft }: { spotsLeft: number }) => {
  return (
    <div className="absolute top-4 right-4 z-20">
      <div className="relative">
        <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping"></div>
        <div className="relative bg-red-600 text-white px-3 py-1 rounded-full flex items-center shadow-lg">
          <AlertTriangle className="h-4 w-4 mr-1 text-[#ffd700]" />
          <span className="text-sm font-bold">Apenas {spotsLeft} vagas restantes!</span>
        </div>
      </div>
    </div>
  )
}

// Componente de módulo expansível
const ExpandableModule = ({
  number,
  title,
  description,
  lessons,
  icon,
}: {
  number: number
  title: string
  description: string
  lessons: string[]
  icon: React.ReactNode
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`border border-blue-800 rounded-lg overflow-hidden transition-all duration-300 ${
        isExpanded ? "bg-blue-900/30" : "bg-blue-900/10 hover:bg-blue-900/20"
      }`}
    >
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center">
          <div className="bg-blue-900/50 text-[#ffd700] rounded-full h-8 w-8 flex items-center justify-center mr-3">
            {number}
          </div>
          <div>
            <h3 className="font-bold text-white">{title}</h3>
            {!isExpanded && <p className="text-sm text-blue-300 hidden md:block">{description}</p>}
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-3 text-2xl">{icon}</div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-blue-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-blue-300" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-blue-800/50 animate-accordion-down">
          <p className="text-blue-200 mb-3">{description}</p>
          <h4 className="text-sm font-medium text-white mb-2">O que você vai aprender:</h4>
          <ul className="space-y-2">
            {lessons.map((lesson, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-[#ffd700] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-blue-100">{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Componente de bônus revelável
const RevealableBonus = ({
  title,
  description,
  value,
  icon,
  isRevealed,
  onReveal,
  index,
}: {
  title: string
  description: string
  value: string
  icon: React.ReactNode
  isRevealed: boolean
  onReveal: () => void
  index: number
}) => {
  return (
    <div
      className={`border rounded-lg p-4 transition-all duration-500 ${
        isRevealed
          ? "border-[#ffd700]/50 bg-blue-900/30 animate-reveal"
          : "border-blue-800/30 bg-blue-900/10 filter grayscale opacity-50"
      }`}
    >
      <div className="flex items-start">
        <div
          className={`rounded-full p-2 mr-3 ${
            isRevealed ? "bg-[#ffd700]/20 text-[#ffd700]" : "bg-blue-900/50 text-blue-400"
          }`}
        >
          {icon}
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="font-bold text-white">{title}</h3>
            {isRevealed && (
              <Badge className="ml-2 bg-green-900/50 text-green-300 border border-green-800/50">GRÁTIS</Badge>
            )}
          </div>
          <p className="text-sm text-blue-200 mt-1">{description}</p>
          <p className="text-[#ffd700] font-medium mt-2">{isRevealed ? `Valor: ${value}` : "???"}</p>
        </div>
      </div>
      {!isRevealed && (
        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full border-blue-800 text-blue-300 hover:bg-blue-900/50 hover:text-white"
          onClick={onReveal}
        >
          <Lock className="h-4 w-4 mr-2" />
          Revelar Bônus #{index + 1}
        </Button>
      )}
    </div>
  )
}

// Componente de FAQ expansível
const ExpandableFAQ = ({ question, answer }: { question: string; answer: string }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`border rounded-lg overflow-hidden transition-all duration-300 ${
        isExpanded ? "border-blue-700 bg-blue-900/30" : "border-blue-800 bg-blue-900/10 hover:bg-blue-900/20"
      }`}
    >
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="font-bold text-white">{question}</h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-blue-300 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue-300 flex-shrink-0" />
        )}
      </div>
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-blue-800/50 animate-accordion-down">
          <p className="text-blue-200">{answer}</p>
        </div>
      )}
    </div>
  )
}

// Componente principal
export default function Home() {
  const [spotsLeft, setSpotsLeft] = useState(37)
  const [showNotification, setShowNotification] = useState(false)
  const [revealedBonuses, setRevealedBonuses] = useState<boolean[]>([false, false, false, false, false])
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Efeito para mostrar notificações de compra periodicamente
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 5000)
    }, 45000)

    return () => clearInterval(notificationInterval)
  }, [])

  // Efeito para diminuir o número de vagas periodicamente
  useEffect(() => {
    const spotsInterval = setInterval(() => {
      setSpotsLeft((prev) => (prev > 1 ? prev - 1 : 1))
    }, 300000) // A cada 5 minutos

    return () => clearInterval(spotsInterval)
  }, [])

  // Efeito para mostrar o CTA flutuante ao rolar
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const videoPosition = videoRef.current.getBoundingClientRect().bottom
        setShowFloatingCTA(videoPosition < 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Função para revelar um bônus
  const revealBonus = (index: number) => {
    const newRevealedBonuses = [...revealedBonuses]
    newRevealedBonuses[index] = true
    setRevealedBonuses(newRevealedBonuses)

    // Mostrar confete quando todos os bônus forem revelados
    if (newRevealedBonuses.every((revealed) => revealed)) {
      toast({
        title: "Todos os bônus desbloqueados!",
        description: "Você desbloqueou R$98 em bônus exclusivos!",
        variant: "default",
      })
    }
  }

  // Função para simular uma compra
  const simulatePurchase = () => {
    toast({
      title: "🎉 Parabéns pela sua decisão!",
      description: "Estamos preparando seu acesso ao Manual Estoico...",
      variant: "default",
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#001233]">
      {/* Primeira Dobra - Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#001233] via-[#001845] to-[#023e8a] opacity-80"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://optimalhealthscout.shop/wp-content/uploads/2025/05/imagem_gerada-2025-05-21T125256.553.png')] bg-cover bg-center opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-blue-400/10"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `pulse ${Math.random() * 5 + 3}s infinite`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Indicador de vagas limitadas */}
        <LimitedSpotsIndicator spotsLeft={spotsLeft} />
        <span>
          .
        </span>

        <div className="container relative z-10 mx-auto px-4">

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left">

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="block text-white">DOMINE SUA MENTE </span>
                <span className="block text-[#ffd700]">CONTROLE SUA VIDA</span>
              </h1>

            {/* Vídeo de apresentação */}
            <div className="relative mb-12 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ffd700] to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-blue-900/50 border-2 border-blue-800 rounded-lg overflow-hidden aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/RK9kW5xaugU?rel=0&showinfo=0&modestbranding=1"
                  title="Manual Estoico - Vídeo de apresentação"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

              <div className="inline-block mb-6">
                <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1 text-sm">
                  ACESSO IMEDIATO
                </Badge>
              </div>

              <p className="text-xl md:text-2xl font-medium text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
                O Sistema Definitivo Que Já Transformou a Vida de{" "}
                <span className="text-[#ffd700] font-bold">3.111 Pessoas</span> Através do Poder do Estoicismo
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-[#ffd700] hover:bg-[#e6c200] text-[#001233] text-lg h-14 px-8 rounded-full font-bold shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  QUERO COMEÇAR AGORA
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-blue-200">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#ffd700] mr-2" />
                  <span>Acesso Imediato</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-[#ffd700] mr-2" />
                  <span>Garantia de 7 Dias</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-[#ffd700] mr-2" />
                  <span>Oferta por Tempo Limitado</span>
                </div>
              </div>
            </div>

                  {/* Terceira Dobra - O Que Você Vai Aprender */}
      <section className="py-16 bg-gradient-to-b from-[#001845] to-[#001233]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-blue-900/50 text-blue-300 hover:bg-blue-900/50 border border-blue-800">
              TRANSFORMAÇÃO COMPLETA
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              O Que Você Vai <span className="text-[#ffd700]">Aprender</span>
            </h2>
            <p className="text-xl text-blue-200">Domine estas 6 áreas essenciais e transforme completamente sua vida</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Controle Emocional",
                description:
                  "Aprenda a responder em vez de reagir às situações, mantendo a calma mesmo nos momentos mais difíceis.",
                icon: <Brain className="h-8 w-8 text-[#ffd700]" />,
              },
              {
                title: "Foco no Essencial",
                description:
                  "Identifique o que realmente está sob seu controle e pare de desperdiçar energia com o que não pode mudar.",
                icon: <Target className="h-8 w-8 text-[#ffd700]" />,
              },
              {
                title: "Resiliência Mental",
                description:
                  "Desenvolva uma mente inabalável que permanece forte e clara mesmo diante das maiores adversidades.",
                icon: <Zap className="h-8 w-8 text-[#ffd700]" />,
              },
              {
                title: "Relacionamentos Saudáveis",
                description:
                  "Transforme suas interações com os outros através da compreensão, paciência e comunicação efetiva.",
                icon: <Heart className="h-8 w-8 text-[#ffd700]" />,
              },
              {
                title: "Clareza de Propósito",
                description:
                  "Descubra seu propósito de vida e alinhe suas ações diárias com seus valores mais profundos.",
                icon: <Lightbulb className="h-8 w-8 text-[#ffd700]" />,
              },
              {
                title: "Produtividade Superior",
                description:
                  "Elimine a procrastinação e desenvolva uma disciplina inabalável para realizar o que realmente importa.",
                icon: <Flame className="h-8 w-8 text-[#ffd700]" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-blue-900/20 border border-blue-800 rounded-lg p-6 hover:bg-blue-900/30 transition-all duration-300 hover:scale-105 hover:border-blue-700"
              >
                <div className="bg-blue-900/50 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-blue-200">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-[#ffd700] hover:bg-[#e6c200] text-[#001233] text-lg h-14 px-8 rounded-full font-bold shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105"
              onClick={() => window.location.href = "https://pay.cakto.com.br/34ajqm9_394962"}
            >
              QUERO ESTAS HABILIDADES
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

          </div>

      {/* Quinta Dobra - Depoimentos */}
      <section className="py-16 bg-gradient-to-b from-[#001233] to-[#001845]">
        <div className="container mx-auto px-4">
          {/* Depoimentos */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-blue-900/50 text-blue-300 hover:bg-blue-900/50 border border-blue-800">
              RESULTADOS REAIS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pessoas Comuns, <span className="text-[#ffd700]">Resultados Extraordinários</span>
            </h2>
            <p className="text-xl text-blue-200">
              Depoimentos não editados de pessoas que investiram apenas R$67 no Manual Estoico
            </p>
          </div>

          {/* Seção de Depoimentos */}
           <div className="testimonial-section">
             <div className="testimonial-container">
              <div className="testimonial">
                <img src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/sem-Rafael-prova2.png" alt="Depoimento 1" />
              </div>
              <div className="testimonial">
                <img src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/sem-Carlos-prova2.png" alt="Depoimento 2" />
              </div>
             <div className="testimonial">
               <img src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/sem-Beatriz-prova4.png" alt="Depoimento 3" />
              </div>
              <div className="testimonial">
                <img src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/sem-Andre-prova4.png" alt="Depoimento 4" />
              </div>
            </div>
          </div>
        </div>
      </section>
      

          {/* Quarta Dobra - Conteúdo do Curso e Bônus */}
          <div className="mt-12 pt-8 border-t border-blue-800/50">
            <div className="text-center mb-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#ffd700]/20 text-[#ffd700] hover:bg-[#ffd700]/20 border border-[#ffd700]/30">
              CONTEÚDO EXCLUSIVO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Tudo Que Você Vai <span className="text-[#ffd700]">Receber</span>
            </h2>
            <p className="text-xl text-blue-200">
              Um sistema completo para transformar sua mente através do Estoicismo
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="modules" className="mb-12">
              <TabsList className="grid grid-cols-2 w-full mb-8">
                <TabsTrigger value="modules" className="text-lg py-3">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Módulos do Curso
                </TabsTrigger>
                <TabsTrigger value="bonuses" className="text-lg py-3">
                  <Gift className="h-5 w-5 mr-2" />
                  Bônus Exclusivos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="modules" className="space-y-4 animate-fade-in">
                {[
                  {
                    number: 1,
                    title: "Fundamentos do Estoicismo",
                    description:
                      "Compreenda os princípios básicos da filosofia estoica e como eles se aplicam à vida moderna.",
                    icon: "🧠",
                    lessons: [
                      "A história do Estoicismo e seus principais filósofos",
                      "Os três pilares do Estoicismo: Lógica, Física e Ética",
                      "A dicotomia do controle: o que está e o que não está sob seu controle",
                      "Como aplicar o Estoicismo no século 21",
                    ],
                  },
                  {
                    number: 2,
                    title: "Dominando Suas Emoções",
                    description:
                      "Aprenda técnicas práticas para gerenciar suas emoções e responder em vez de reagir às situações.",
                    icon: "💪",
                    lessons: [
                      "Como as emoções são formadas segundo a visão estoica",
                      "Técnicas para identificar e interromper reações emocionais negativas",
                      "O método de 4 passos para transformar emoções destrutivas",
                      "Exercícios diários para fortalecer seu controle emocional",
                    ],
                  },
                  {
                    number: 3,
                    title: "A Dicotomia do Controle",
                    description:
                      "Domine a habilidade de focar apenas no que está sob seu controle e libertar-se da ansiedade.",
                    icon: "⚖️",
                    lessons: [
                      "Como identificar o que realmente está sob seu controle",
                      "Técnica da visualização negativa (premeditatio malorum)",
                      "Como desenvolver a indiferença estoica (apatheia)",
                      "Exercícios práticos para aplicar a dicotomia do controle no dia a dia",
                    ],
                  },
                  {
                    number: 4,
                    title: "Virtudes Estoicas na Prática",
                    description: "Incorpore as quatro virtudes cardeais do Estoicismo em sua vida diária.",
                    icon: "✨",
                    lessons: [
                      "Sabedoria (Sophia): como tomar decisões mais sábias",
                      "Coragem (Andreia): como enfrentar seus medos",
                      "Justiça (Dikaiosyne): como agir com integridade em todas as situações",
                      "Temperança (Sophrosyne): como desenvolver autocontrole e moderação",
                    ],
                  },
                  {
                    number: 5,
                    title: "Relacionamentos Estoicos",
                    description: "Transforme suas interações com os outros através dos princípios estoicos.",
                    icon: "👥",
                    lessons: [
                      "Como lidar com pessoas difíceis usando princípios estoicos",
                      "Técnicas para comunicação efetiva baseada em valores",
                      "Como desenvolver empatia genuína sem se deixar afetar emocionalmente",
                      "Estratégias para resolver conflitos com sabedoria estoica",
                    ],
                  },
                  {
                    number: 6,
                    title: "Produtividade e Foco",
                    description:
                      "Elimine a procrastinação e desenvolva uma disciplina inabalável para realizar o que importa.",
                    icon: "🎯",
                    lessons: [
                      "Como definir prioridades baseadas em valores estoicos",
                      "Técnicas para eliminar distrações e manter o foco",
                      "O método estoico para vencer a procrastinação",
                      "Como desenvolver hábitos positivos que duram",
                    ],
                  },
                  {
                    number: 7,
                    title: "Resiliência Mental Avançada",
                    description:
                      "Desenvolva uma mente que permanece forte e clara mesmo nas situações mais desafiadoras.",
                    icon: "🔄",
                    lessons: [
                      "Como transformar adversidades em oportunidades de crescimento",
                      "Técnicas avançadas de meditação estoica",
                      "Como desenvolver uma perspectiva cósmica (visão do alto)",
                      "Integrando o Estoicismo como filosofia de vida permanente",
                    ],
                  },
                ].map((module) => (
                  <ExpandableModule
                    key={module.number}
                    number={module.number}
                    title={module.title}
                    description={module.description}
                    lessons={module.lessons}
                    icon={<span className="text-2xl">{module.icon}</span>}
                  />
                ))}
              </TabsContent>

              <TabsContent value="bonuses" className="animate-fade-in">
                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <Sparkles className="h-6 w-6 text-[#ffd700] mr-2" />
                    <h3 className="text-xl font-bold text-white">Desbloqueie Todos os Bônus Exclusivos</h3>
                  </div>
                  <p className="text-blue-200 mb-4">
                    Clique nos botões abaixo para revelar cada um dos 5 bônus exclusivos que você receberá ao adquirir o
                    Manual Estoico hoje.
                  </p>
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-blue-900/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#ffd700]"
                        style={{
                          width: `${
                            (revealedBonuses.filter((revealed) => revealed).length / revealedBonuses.length) * 100
                          }%`,
                          transition: "width 0.5s ease-in-out",
                        }}
                      ></div>
                    </div>
                    <span className="ml-3 text-blue-200 font-medium">
                      {revealedBonuses.filter((revealed) => revealed).length}/{revealedBonuses.length} desbloqueados
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Biblioteca Estoica Digital",
                      description: "Acesso a 5 obras clássicas do Estoicismo em formato digital.",
                      value: "R$27",
                      icon: <BookOpen className="h-5 w-5" />,
                    },
                    {
                      title: "Diário Estoico (PDF)",
                      description: "Template para acompanhar sua prática diária e registrar seus progressos.",
                      value: "R$17",
                      icon: <BookOpen className="h-5 w-5" />,
                    },
                    {
                      title: "Guia de Aplicação Rápida",
                      description: "Resumo prático para consulta rápida em momentos de necessidade.",
                      value: "R$17",
                      icon: <Zap className="h-5 w-5" />,
                    },
                    {
                      title: "Suporte por Email",
                      description: "Tire suas dúvidas diretamente com nossa equipe por 30 dias.",
                      value: "R$37",
                      icon: <MessageCircle className="h-5 w-5" />,
                    },
                    {
                      title: "Acesso à Comunidade Privada",
                      description: "Junte-se a outros praticantes do Estoicismo para suporte mútuo.",
                      value: "R$37/mês",
                      icon: <Users className="h-5 w-5" />,
                    },
                  ].map((bonus, i) => (
                    <RevealableBonus
                      key={i}
                      title={bonus.title}
                      description={bonus.description}
                      value={bonus.value}
                      icon={bonus.icon}
                      isRevealed={revealedBonuses[i]}
                      onReveal={() => revealBonus(i)}
                      index={i}
                    />
                  ))}
                </div>

                <div className="mt-8 bg-blue-900/30 border border-blue-800 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Valor Total dos Bônus:{" "}
                    <span className="text-[#ffd700]">
                      {revealedBonuses.every((revealed) => revealed) ? "R$98" : "???"}
                    </span>
                  </h3>
                  <p className="text-blue-200">
                    {revealedBonuses.every((revealed) => revealed)
                      ? "Todos inclusos hoje na sua inscrição sem custo adicional!"
                      : "Continue revelando para ver o valor total dos bônus!"}
                  </p>
                </div>
              </TabsContent>
            </Tabs>

          </div>
            </div>
          </div>
        </div>
      </section>


      {/* Segunda Dobra - Vídeo e Primeira CTA */}
<section className="py-16 bg-[#001845]" ref={videoRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">


          {/* Contador regressivo */}
          <div className="max-w-4xl mx-auto mb-8 bg-blue-900/30 border border-blue-800/50 rounded-lg p-3 text-center">
            <p className="text-blue-200 text-sm mb-1">ESTA OFERTA ESPECIAL EXPIRA EM:</p>
            <CountdownTimer />
          </div>

            {/* Primeira CTA */}
            <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-6 md:p-8 text-center">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Transforme Sua Mente Por Apenas{" "}
                  <span className="text-[#ffd700]">
                    R$67<span className="text-sm align-top ml-1">à vista</span>
                  </span>
                </h2>
                <p className="text-xl text-blue-200">ou em até 12x de R$6,70 no cartão</p>
              </div>

              <Button
                size="lg"
                className="bg-[#ffd700] hover:bg-[#e6c200] text-[#001233] text-xl h-16 px-10 rounded-full font-bold shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 mb-4 w-full md:w-auto"
                onClick={() => window.location.href = "https://pay.cakto.com.br/34ajqm9_394962"}
              >
                MUDAR MINHA VIDA AGORA
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-[#ffd700] mr-2" />
                  <span className="text-blue-200 text-sm">Garantia de 7 dias</span>
                </div>
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-[#ffd700] mr-2" />
                  <span className="text-blue-200 text-sm">Pagamento 100% seguro</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#ffd700] mr-2" />
                  <span className="text-blue-200 text-sm">Acesso imediato</span>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {["Visa", "Master", "Pix", "Boleto"].map((method, i) => (
                  <div key={i} className="bg-blue-900/50 text-blue-200 text-xs px-2 py-1 rounded">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Quinta Dobra - Garantia */}
      <section className="py-16 bg-gradient-to-b from-[#001233] to-[#001845]">
        <div className="container mx-auto px-4">

          {/* Garantia */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 rounded-xl p-8 border border-blue-800/50 shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 flex justify-center">
                 <div className="relative">
                  <div className="absolute inset-0 bg-[#ffd700]/20 rounded-full animate-ping"></div>
                  <div className="relative bg-[#ffd700]/10 rounded-full p-6">
                  <img 
                   src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/Etiqueta-selo-de-garantia-moderno-em-dourado-1.png" 
                   alt="Garantia" 
                   className="h-24 w-24"/>
                 </div>
                </div>
              </div>

                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold text-white mb-4">Garantia Incondicional de 7 Dias</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-blue-100 mb-4">
                      Não vou te enrolar com promessas complicadas. A garantia é simples:
                    </p>

                    <p className="text-blue-100 mb-4">
                      <span className="text-[#ffd700] font-semibold">
                        Se você não sentir que o Manual Estoico vale pelo menos 10 vezes o que você pagou, eu devolvo
                        seu dinheiro.
                      </span>{" "}
                      Sem perguntas. Sem complicações.
                    </p>

                    <p className="text-blue-100 mb-4">
                      Você tem 7 dias para avaliar o material. Se não ficar satisfeito por qualquer motivo, basta enviar
                      um email e devolveremos seu dinheiro na hora.
                    </p>

                    <p className="text-blue-100">
                      Estou assumindo todo o risco porque sei o poder transformador deste material. Você não tem nada a
                      perder e uma mente inabalável a ganhar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sexta Dobra - FAQs e CTA Final */}
      <section className="py-16 bg-[#001845]">
        <div className="container mx-auto px-4">
          {/* FAQs */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Perguntas <span className="text-[#ffd700]">Frequentes</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            {[
              {
                question: "O que exatamente eu recebo por R$67?",
                answer:
                  "Você recebe o Manual Estoico Digital completo com 7 módulos, 21 exercícios práticos diários, 7 meditações estoicas em PDF, acesso ao grupo privado de praticantes, e todos os 5 bônus exclusivos. Todo o material tem acesso vitalício.",
              },
              {
                question: "Preciso ter conhecimento prévio sobre Estoicismo?",
                answer:
                  "Não. O Manual foi desenhado para iniciantes absolutos. Começamos com os conceitos mais básicos e progredimos gradualmente. Tudo é explicado em linguagem simples e direta.",
              },
              {
                question: "Quanto tempo leva para ver resultados?",
                answer:
                  "A maioria dos alunos relata mudanças perceptíveis em sua resposta emocional já na primeira semana. O programa completo dura 21 dias, e ao final deste período, você terá desenvolvido uma nova forma de pensar e reagir às situações.",
              },
              {
                question: "O Estoicismo é compatível com minha religião?",
                answer:
                  "Sim. O Estoicismo é uma filosofia prática, não uma religião. Seus princípios são compatíveis com praticamente todas as tradições religiosas, pois focam em virtudes universais como sabedoria, coragem, justiça e moderação.",
              },
              {
                question: "Como funciona a garantia?",
                answer:
                  "Você tem 7 dias para avaliar o material. Se não ficar satisfeito por qualquer motivo, basta enviar um email e devolveremos 100% do seu dinheiro, sem perguntas.",
              },
            ].map((faq, i) => (
              <ExpandableFAQ key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>

         {/* CTA Intermediária */}
            <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 rounded-xl p-8 border border-blue-800/50 shadow-xl text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Tudo Isso Por Apenas <span className="text-[#ffd700]">R$67</span>
              </h3>
              <p className="text-xl text-blue-200 mb-6">
                Menos que o preço de um jantar para transformar sua mente para sempre
              </p>
              <Button
                size="lg"
                className="bg-[#ffd700] hover:bg-[#e6c200] text-[#001233] text-lg h-14 px-8 rounded-full font-bold shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105"
                onClick={() => window.location.href = "https://pay.cakto.com.br/34ajqm9_394962"}
              >
                QUERO GARANTIR AGORA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="mt-4 text-blue-300 text-sm">
                <div className="flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-[#ffd700] mr-1" />
                  <span>Apenas {spotsLeft} vagas disponíveis neste valor</span>
                </div>
              </div>
            </div>

          <div className="mt-12 pt-8 border-t border-blue-800/50">
            <div className="text-center mb-6">
          <div className="max-w-3xl mx-auto text-center mb-12"></div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-xl p-8 border border-blue-800/50 shadow-xl text-center">
            <Badge className="mb-6 bg-[#ffd700]/20 text-[#ffd700] hover:bg-[#ffd700]/20 border border-[#ffd700]/30 px-4 py-1.5">
              COMECE SUA TRANSFORMAÇÃO HOJE
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Duas Escolhas. <span className="text-[#ffd700]">Um Momento Decisivo.</span>
            </h2>

            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-xl text-blue-100">
                Neste exato momento, você está diante de uma escolha que pode mudar o curso da sua vida.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6 mb-8">
                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6 text-left">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                    <X className="h-5 w-5 text-red-400 mr-2" />
                    Caminho 1: Continuar Como Está
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Continuar reagindo emocionalmente a situações cotidianas",
                      "Permanecer à mercê de ansiedade e preocupações desnecessárias",
                      "Desperdiçar energia com o que você não pode controlar",
                      "Manter relacionamentos prejudicados por reações impulsivas",
                      "Acordar amanhã exatamente como você acordou hoje",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <X className="h-4 w-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-blue-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6 text-left">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />
                    Caminho 2: Transformar Sua Mente
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Desenvolver controle emocional em qualquer situação",
                      "Eliminar ansiedade focando apenas no que você pode controlar",
                      "Construir relacionamentos mais saudáveis e produtivos",
                      "Encontrar clareza de propósito e significado em sua vida",
                      "Começar uma nova jornada de transformação hoje mesmo",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-blue-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-xl text-[#ffd700]">
                "O melhor momento para plantar uma árvore foi há 20 anos. O segundo melhor momento é agora."
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <Button
                size="lg"
                className="w-full bg-[#ffd700] hover:bg-[#e6c200] text-[#001233] text-xl h-16 rounded-full font-bold shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 mb-4"
                onClick={() => window.location.href = "https://pay.cakto.com.br/34ajqm9_394962"}
              >
                TRANSFORMAR MINHA MENTE
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <div className="flex items-center justify-center gap-2 text-blue-300 text-sm">
                <Lock className="h-4 w-4 text-[#ffd700]" />
                <span>Pagamento 100% seguro</span>
                <span>•</span>
                <span>Acesso imediato</span>
                <span>•</span>
                <span>Garantia de 7 dias</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notificação de compra recente */}
      {showNotification && <RecentPurchaseNotification onClose={() => setShowNotification(false)} />}

      {/* Footer */}
      <footer className="py-8 bg-[#000c1f] text-blue-400 border-t border-blue-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-[#ffd700]" />
              <span className="text-xl font-bold text-white">Manual Estoico</span>
            </div>
          <div className="mt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Manual Estoico - Todos os direitos reservados.</p>
          </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm">
              <Link href="" className="hover:text-white transition-colors">
                Termos de Uso
              </Link>
              <Link href="" className="hover:text-white transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </footer>

}
