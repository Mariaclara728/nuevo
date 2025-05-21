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
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/https://optimalhealthscout.shop/wp-content/uploads/2025/05/imagem_gerada-2025-05-21T125256.553.png')] bg-cover bg-center opacity-10"></div>
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

        <div className="container relative z-10 mx-auto px-4">
          {/* Contador regressivo */}
          <div className="max-w-4xl mx-auto mb-8 bg-blue-900/30 border border-blue-800/50 rounded-lg p-3 text-center">
            <p className="text-blue-200 text-sm mb-1">ESTA OFERTA ESPECIAL EXPIRA EM:</p>
            <CountdownTimer />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="inline-block mb-6">
                <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1 text-sm">
                  ACESSO IMEDIATO
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="block text-white">DOMINE SUA MENTE </span>
                <span className="block text-[#ffd700]">CONTROLE SUA VIDA</span>
              </h1>

              <p className="text-xl md:text-2xl font-medium text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
                O Sistema Definitivo Que Já Transformou a Vida de{" "}
                <span className="text-[#ffd700] font-bold">7.342 Pessoas</span> Através do Poder do Estoicismo
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  size="lg"
                  className="bg-[#ffd700] hover:bg-[#e6c200] text-[#001233] text-lg h-14 px-8 rounded-full font-bold shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 max-w-full"
                  onClick={simulatePurchase}
                >
                  <span className="flex items-center whitespace-nowrap">
                    QUERO COMEÇAR AGORA
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-400/30 text-blue-100 hover:bg-blue-800/20 text-lg h-14 px-8 rounded-full flex items-center gap-2 max-w-full"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  <Play className="h-5 w-5 text-[#ffd700]" fill="#ffd700" />
                  Ver Vídeo
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

            <div className="w-full lg:w-1/2 relative">
              <div className="relative mx-auto max-w-md">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-[#ffd700]/30"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-[#ffd700]/30"></div>

                {/* Book mockup */}
                <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=400')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

                  <div className="pt-8 pb-4 px-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-32 h-32 rounded-full bg-blue-700 flex items-center justify-center border-4 border-[#ffd700]/70 shadow-lg">
                        <Image
                          src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/imagem_gerada-2025-05-21T121047.991.png"
                          alt="Logo Manual Estoico"
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-center text-white mb-2">Manual Estoico</h3>
                    <p className="text-blue-200 text-center text-sm mb-4">EDIÇÃO PREMIUM</p>

                    <div className="bg-blue-800/50 rounded-lg p-4 mb-4">
                      <ul className="space-y-2">
                        {[
                          "7 Módulos Completos",
                          "Exercícios Práticos",
                          "Meditações Guiadas",
                          "Acesso Vitalício",
                          "Suporte Exclusivo",
                          "Comunidade Privada",
                          "Atualizações Gratuitas",
                        ].map((item, i) => (
                          <li key={i} className="flex items-center text-sm text-blue-100">
                            <CheckCircle className="h-4 w-4 text-[#ffd700] mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-center">
                      <Badge className="bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/30 px-3 py-1">
                        + 5 Bônus Exclusivos
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Price tag */}
                <div className="absolute -top-4 -right-4 bg-[#ffd700] text-[#001233] font-bold px-4 py-2 rounded-full shadow-lg transform rotate-12 z-10">
                  <div className="text-xs line-through">R$197</div>
                  <div className="text-xl">R$47</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segunda Dobra - Vídeo e Benefícios */}
      <section className="py-16 bg-gradient-to-b from-[#001233] to-[#001845]" ref={videoRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Vídeo */}
            <div className="relative bg-blue-900/30 border border-blue-800 rounded-xl overflow-hidden mb-12">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-full bg-blue-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-[#ffd700]/20 rounded-full p-6 inline-flex mb-4">
                      <Play className="h-16 w-16 text-[#ffd700]" fill="#ffd700" />
                    </div>
                    <p className="text-blue-200">Clique para assistir o vídeo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefícios */}
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-900/50 text-blue-300 hover:bg-blue-900/50 border border-blue-800">
                BENEFÍCIOS COMPROVADOS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                O Que Você Vai <span className="text-[#ffd700]">Conquistar</span>
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                O Manual Estoico foi desenvolvido para transformar sua mente e sua vida em apenas 21 dias, através de
                princípios testados por mais de 2.000 anos
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  title: "Controle Emocional Absoluto",
                  description:
                    "Aprenda a técnica dos 3 círculos estoicos para nunca mais perder o controle emocional em situações difíceis.",
                  icon: <Brain className="h-6 w-6 text-[#ffd700]" />,
                },
                {
                  title: "Fim da Ansiedade Crônica",
                  description:
                    "Domine o método da 'Visualização Negativa' que elimina a ansiedade ao preparar sua mente para qualquer cenário.",
                  icon: <Zap className="h-6 w-6 text-[#ffd700]" />,
                },
                {
                  title: "Relacionamentos Mais Saudáveis",
                  description:
                    "Descubra como aplicar a 'Dicotomia do Controle' para transformar todos os seus relacionamentos pessoais e profissionais.",
                  icon: <Heart className="h-6 w-6 text-[#ffd700]" />,
                },
                {
                  title: "Clareza de Propósito",
                  description:
                    "Utilize o exercício da 'Bússola Interna' para identificar seu propósito de vida e tomar decisões alinhadas com seus valores.",
                  icon: <Target className="h-6 w-6 text-[#ffd700]" />,
                },
                {
                  title: "Produtividade Elevada",
                  description:
                    "Implemente o sistema de 'Blocos Estoicos' para eliminar a procrastinação e multiplicar sua produtividade diária.",
                  icon: <Lightbulb className="h-6 w-6 text-[#ffd700]" />,
                },
                {
                  title: "Resiliência Mental",
                  description:
                    "Desenvolva a mentalidade do 'Amor ao Destino' que transforma obstáculos em oportunidades de crescimento.",
                  icon: <Flame className="h-6 w-6 text-[#ffd700]" />,
                },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="bg-blue-900/20 border border-blue-800 rounded-lg p-6 hover:bg-blue-900/30 transition-all duration-300 hover:border-blue-700"
                >
                  <div className="flex items-start">
                    <div className="bg-blue-900/50 rounded-full p-3 mr-4">{benefit.icon}</div>
                    <div>
                      <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-blue-200 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { value: "94%", label: "relatam redução significativa de ansiedade" },
                { value: "89%", label: "melhoraram seus relacionamentos pessoais" },
                { value: "78%", label: "aumentaram sua produtividade no trabalho" },
                { value: "97%", label: "recomendariam para um amigo" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 text-center hover:bg-blue-900/40 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-[#ffd700] mb-2">{stat.value}</div>
                  <p className="text-blue-200 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-[#ffd700] hover:bg-[#e6c200] text-[#001233] text-lg h-14 px-8 rounded-full font-bold shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 max-w-full mx-auto"
                onClick={() => window.location.href = "https://pay.cakto.com.br/34ajqm9_394962"}
              >
                <span className="flex items-center whitespace-nowrap">
                  QUERO TRANSFORMAR MINHA MENTE AGORA
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Terceira Dobra - Conteúdo do Curso */}
      <section className="py-16 bg-[#001845]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-blue-900/50 text-blue-300 hover:bg-blue-900/50 border border-blue-800">
              CONTEÚDO COMPLETO
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              O Que Está Incluído No <span className="text-[#ffd700]">Manual Estoico</span>
            </h2>
            <p className="text-xl text-blue-200">
              7 módulos estrategicamente organizados para transformar sua mente em apenas 21 dias
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            {[
              {
                number: 1,
                title: "Fundamentos do Estoicismo",
                description:
                  "Entenda os princípios básicos que transformaram a vida de imperadores, atletas e CEOs ao longo de 2.000 anos.",
                lessons: [
                  "A história e os principais pensadores estoicos",
                  "Os 3 pilares fundamentais do Estoicismo",
                  "Como aplicar a filosofia estoica no mundo moderno",
                  "Exercício prático: Diário Estoico (modelo incluído)",
                ],
                icon: <BookOpen className="text-[#ffd700]" />,
              },
              {
                number: 2,
                title: "Dicotomia do Controle",
                description:
                  "Domine o princípio mais poderoso do Estoicismo para eliminar preocupações desnecessárias e focar sua energia no que realmente importa.",
                lessons: [
                  "Como identificar o que está e o que não está sob seu controle",
                  "A técnica dos 3 círculos para tomada de decisões",
                  "Eliminando a ansiedade através da aceitação ativa",
                  "Exercício prático: Mapeamento de Controle Diário",
                ],
                icon: <Target className="text-[#ffd700]" />,
              },
              {
                number: 3,
                title: "Visualização Negativa",
                description:
                  "Aprenda a técnica milenar que elimina o medo do futuro e desenvolve gratidão genuína pelo presente.",
                lessons: [
                  "O método Premeditatio Malorum para preparar sua mente para desafios",
                  "Como transformar pessimismo em resiliência mental",
                  "Desenvolvendo gratidão através da escassez imaginada",
                  "Exercício prático: Visualização Negativa Guiada (áudio incluído)",
                ],
                icon: <Brain className="text-[#ffd700]" />,
              },
              {
                number: 4,
                title: "Amor ao Destino (Amor Fati)",
                description:
                  "Descubra como aceitar e até mesmo amar os obstáculos, transformando-os em oportunidades de crescimento.",
                lessons: [
                  "A mentalidade que transformou a vida de Nietzsche e Mandela",
                  "Como encontrar oportunidades escondidas em cada problema",
                  "Técnicas para desenvolver resiliência inabalável",
                  "Exercício prático: Reinterpretação de Obstáculos",
                ],
                icon: <Heart className="text-[#ffd700]" />,
              },
              {
                number: 5,
                title: "Atenção Plena Estoica",
                description:
                  "Combine mindfulness moderno com práticas estoicas para desenvolver presença mental e clareza de pensamento.",
                lessons: [
                  "A diferença entre mindfulness budista e atenção estoica",
                  "Técnicas de observação desapegada dos pensamentos",
                  "Como usar a atenção plena para controlar emoções negativas",
                  "Exercício prático: Meditação Estoica Diária (áudio incluído)",
                ],
                icon: <Zap className="text-[#ffd700]" />,
              },
              {
                number: 6,
                title: "Virtude e Propósito",
                description:
                  "Estabeleça um código de valores pessoal que guiará suas decisões e dará significado à sua vida.",
                lessons: [
                  "As 4 virtudes cardeais do Estoicismo e como aplicá-las hoje",
                  "Desenvolvendo seu código de conduta pessoal",
                  "Como encontrar propósito através do serviço aos outros",
                  "Exercício prático: Bússola de Valores Pessoais",
                ],
                icon: <Target className="text-[#ffd700]" />,
              },
              {
                number: 7,
                title: "Integração e Prática Diária",
                description:
                  "Consolide todo o aprendizado em uma rotina diária sustentável que transformará sua mente permanentemente.",
                lessons: [
                  "Criando sua rotina matinal estoica em 20 minutos",
                  "Revisão vespertina para crescimento contínuo",
                  "Como manter a prática mesmo em períodos desafiadores",
                  "Exercício prático: Seu Plano de 90 Dias para Domínio Mental",
                ],
                icon: <CheckCircle className="text-[#ffd700]" />,
              },
            ].map((module, i) => (
              <ExpandableModule
                key={i}
                number={module.number}
                title={module.title}
                description={module.description}
                lessons={module.lessons}
                icon={module.icon}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-[#ffd700] hover:bg-[#e6c200] text-[#001233] text-lg h-14 px-8 rounded-full font-bold shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 max-w-full mx-auto"
              onClick={() => window.location.href = "https://pay.cakto.com.br/34ajqm9_394962"}
            >
              <span className="flex items-center whitespace-nowrap">
                QUERO TER ACESSO A TODO CONTEÚDO
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Quarta Dobra - Bônus e Preço */}
      <section className="py-16 bg-gradient-to-b from-[#001845] to-[#001233]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="bonus" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger
                  value="bonus"
                  className="text-lg py-3 data-[state=active]:bg-blue-900/30 data-[state=active]:text-[#ffd700] data-[state=active]:shadow-none"
                >
                  <Gift className="h-5 w-5 mr-2" />
                  Bônus Exclusivos
                </TabsTrigger>
                <TabsTrigger
                  value="pricing"
                  className="text-lg py-3 data-[state=active]:bg-blue-900/30 data-[state=active]:text-[#ffd700] data-[state=active]:shadow-none"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  O Que Você Recebe
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pricing" className="space-y-6">
                <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <h3 className="text-2xl font-bold text-white mb-4">Investimento Único</h3>
                      <div className="mb-4">
                        <span className="text-blue-300 text-lg line-through">De R$197</span>
                        <div className="text-4xl font-bold text-[#ffd700]">Por R$47</div>
                        <span className="text-blue-300">Pagamento único</span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-[#ffd700] mr-2 flex-shrink-0" />
                          <span className="text-blue-100">Acesso vitalício a todo o conteúdo</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-[#ffd700] mr-2 flex-shrink-0" />
                          <span className="text-blue-100">Atualizações gratuitas</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-[#ffd700] mr-2 flex-shrink-0" />
                          <span className="text-blue-100">Suporte por 30 dias</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-[#ffd700] mr-2 flex-shrink-0" />
                          <span className="text-blue-100">Garantia de 7 dias</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-[#ffd700] mr-2 flex-shrink-0" />
                          <span className="text-blue-100">Todos os 5 bônus inclusos</span>
                        </div>
                      </div>

                      <Button
                        size="lg"
                        className="w-full bg-[#ffd700] hover:bg-[#e6c200] text-[#001233] text-lg h-14 rounded-full font-bold shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 max-w-full"
                        onClick={() => window.location.href = "https://pay.cakto.com.br/34ajqm9_394962"}
                      >
                        <span className="flex items-center whitespace-nowrap">
                          QUERO GARANTIR MINHA VAGA
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </span>
                      </Button>
                    </div>

                    <div className="md:w-1/2">
                      <h3 className="text-xl font-bold text-white mb-4">O Que Está Incluído:</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="bg-blue-900/50 text-[#ffd700] rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            1
                          </div>
                          <div>
                            <h4 className="font-bold text-white">Manual Estoico Completo</h4>
                            <p className="text-sm text-blue-200">7 módulos com exercícios práticos</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-900/50 text-[#ffd700] rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            2
                          </div>
                          <div>
                            <h4 className="font-bold text-white">21 Exercícios Diários</h4>
                            <p className="text-sm text-blue-200">Práticas para transformar sua mente</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-900/50 text-[#ffd700] rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            3
                          </div>
                          <div>
                            <h4 className="font-bold text-white">7 Meditações Guiadas</h4>
                            <p className="text-sm text-blue-200">Áudios para prática diária</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-900/50 text-[#ffd700] rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            4
                          </div>
                          <div>
                            <h4 className="font-bold text-white">Modelos de Diários</h4>
                            <p className="text-sm text-blue-200">Templates para acompanhar seu progresso</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-900/50 text-[#ffd700] rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            5
                          </div>
                          <div>
                            <h4 className="font-bold text-white">Comunidade Privada</h4>
                            <p className="text-sm text-blue-200">Acesso ao grupo exclusivo de praticantes</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-900/50 text-[#ffd700] rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            +
                          </div>
                          <div>
                            <h4 className="font-bold text-white">5 Bônus Exclusivos</h4>
                            <p className="text-sm text-blue-200">Valor adicional de R$98 incluído</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bonus" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {[
                    {
                      title: "Biblioteca de Citações Estoicas",
                      description: "365 citações organizadas por tema para inspiração diária.",
                      value: "R$27",
                      icon: <BookOpen className="h-5 w-5" />,
                    },
                    {
                      title: "Guia de Aplicação Profissional",
                      description: "Como aplicar o Estoicismo para avançar na carreira.",
                      value: "R$37",
                      icon: <Target className="h-5 w-5" />,
                    },
                    {
                      title: "Meditações Estoicas em Áudio",
                      description: "7 meditações guiadas para praticar diariamente.",
                      value: "R$47",
                      icon: <Sparkles className="h-5 w-5" />,
                    },
                    {
                      title: "Suporte Direto por 30 Dias",
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

            {/* CTA Intermediária */}
            <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 rounded-xl p-8 border border-blue-800/50 shadow-xl text-center mt-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Tudo Isso Por Apenas <span className="text-[#ffd700]">R$47</span>
              </h3>
              <p className="text-xl text-blue-200 mb-6">
                Menos que o preço de um jantar para transformar sua mente para sempre
              </p>
              <Button
                size="lg"
                className="bg-[#ffd700] hover:bg-[#e6c200] text-[#001233] text-lg h-14 px-8 rounded-full font-bold shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 max-w-full mx-auto"
                onClick={() => window.location.href = "https://pay.cakto.com.br/34ajqm9_394962"}
              >
                <span className="flex items-center whitespace-nowrap">
                  QUERO GARANTIR MINHA VAGA AGORA
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
              <div className="mt-4 text-blue-300 text-sm">
                <div className="flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-[#ffd700] mr-1" />
                  <span>Apenas {spotsLeft} vagas disponíveis neste valor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quinta Dobra - Depoimentos e Garantia */}
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
              Depoimentos não editados de pessoas que investiram apenas R$47 no Manual Estoico
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {[
              {
                name: "Carlos Mendes, 42",
                role: "Vendedor",
                image: "https://optimalhealthscout.shop/wp-content/uploads/2025/05/f256f28a41fc4b4e1427cc37874429da.jpg",
                text: "Eu tinha crises de ansiedade antes de cada reunião de vendas. Após 14 dias aplicando os exercícios do Manual Estoico, consegui fazer uma apresentação para 30 clientes sem nenhum nervosismo. Minha produtividade aumentou 27%.",
              },
              {
                name: "Mario Silva, 35",
                role: "Pai de 3 filhos",
                image: "https://optimalhealthscout.shop/wp-content/uploads/2025/05/06.png",
                text: "Como Pai de 3 crianças, eu vivia no limite do estresse. O Manual Estoico me ensinou a separar o que posso controlar do que não posso. Agora consigo manter a calma mesmo nos dias mais caóticos. Meus filhos notaram a diferença.",
              },
              {
                name: "Roberto Lima, 51",
                role: "Recém-divorciado",
                image: "https://optimalhealthscout.shop/wp-content/uploads/2025/05/05.png",
                text: "Meu divórcio me deixou devastado. Pensamentos negativos consumiam meus dias. O Manual Estoico me deu ferramentas práticas para aceitar o que não posso mudar. Em 21 dias, voltei a dormir normalmente e retomei minha vida social.",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-6 hover:bg-blue-900/30 transition-all duration-300 hover:scale-105 hover:border-blue-700"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full border-2 border-[#ffd700]/50"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-blue-300">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#ffd700] text-[#ffd700]" />
                  ))}
                </div>

                <p className="text-blue-100 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>

          {/* Garantia */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 rounded-xl p-8 border border-blue-800/50 shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#ffd700]/20 rounded-full animate-ping"></div>
                    <div className="relative bg-[#ffd700]/10 rounded-full p-6">
                      <Shield className="h-24 w-24 text-[#ffd700]" />
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
                      um email para suporte@manualestocio.com.br e devolveremos seu dinheiro na hora.
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
                question: "O que exatamente eu recebo por R$47?",
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
                  "Você tem 7 dias para avaliar o material. Se não ficar satisfeito por qualquer motivo, basta enviar um email para suporte@manualestocio.com.br e devolveremos 100% do seu dinheiro, sem perguntas.",
              },
            ].map((faq, i) => (
              <ExpandableFAQ key={i} question={faq.question} answer={faq.answer} />
            ))}
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
                className="w-full bg-[#ffd700] hover:bg-[#e6c200] text-[#001233] text-xl h-16 rounded-full font-bold shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 mb-4 max-w-full"
                onClick={() => window.location.href = "https://pay.cakto.com.br/34ajqm9_394962"}
              >
                <span className="flex items-center whitespace-nowrap">
                  QUERO TRANSFORMAR MINHA MENTE POR APENAS R$47
                  <ArrowRight className="ml-2 h-6 w-6" />
                </span>
              </Button>
              <div className="flex items-center justify-center gap-2 text-blue-300 text-sm flex-wrap">
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

      {/* CTA Flutuante */}
      {showFloatingCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#001233] border-t border-blue-800 py-3 z-40 animate-slide-up">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="mr-3 hidden md:block">
                  <h3 className="font-bold text-white">Manual Estoico Revelado</h3>
                  <div className="flex items-center">
                    <span className="text-sm text-blue-300 line-through mr-2">R$197</span>
                    <span className="text-[#ffd700] font-bold">R$47</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-[#ffd700] mr-2" />
                  <span className="text-blue-200 text-sm">
                    Oferta expira em: {11}:{45}:{19}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-[#ffd700] hover:bg-[#e6c200] text-[#001233] rounded-full px-6 max-w-full"
                onClick={() => window.location.href = "https://pay.cakto.com.br/34ajqm9_394962"}
              >
                <span className="flex items-center whitespace-nowrap">
                  GARANTIR ACESSO POR R$47
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}

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
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm">
              <Link href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contato
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Manual Estoico. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Chat Button */}
      <div className="fixed bottom-20 right-6 z-30">
        <button className="bg-[#ffd700] text-[#001233] rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-[#e6c200] transition-colors duration-300">
          <MessageCircle className="h-8 w-8" />
        </button>
      </div>
    </div>
  )
}