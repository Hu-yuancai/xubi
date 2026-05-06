import { useEffect, useRef, useState } from 'react'
import './App.css'

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Flow Chart Animation Component
const flowSteps = [
  { num: '1', title: '多AI审题', ai: 'GPT+DS', color: '#7C3AED' },
  { num: '2', title: '初版落地', ai: 'Claude', color: '#8B5CF6' },
  { num: '3', title: '纠错记录', ai: '豆包', color: '#9333EA' },
  { num: '4', title: '深度调研', ai: 'GPT-4o', color: '#A855F7' },
  { num: '5', title: '文献综述', ai: 'GPT-4o', color: '#C026D3' },
  { num: '6', title: '精调参数', ai: 'DeepSeek', color: '#D946EF' },
  { num: '7', title: '结果迭代', ai: 'DS+CC', color: '#E879F9' },
  { num: '8', title: '论文撰写', ai: 'Kimi+DS', color: '#F472B6' },
  { num: '9', title: '记录归档', ai: '豆包', color: '#FB7185' },
  { num: '10', title: '优化润色', ai: 'GPT-4o', color: '#FCA5A5' },
  { num: '11', title: '汇报生成', ai: '多AI', color: '#FCD34D' },
]

function FlowChartAnimation() {
  const [activeStep, setActiveStep] = useState(-1)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    if (activeStep < flowSteps.length - 1) {
      const timer = setTimeout(() => setActiveStep(prev => prev + 1), 400)
      return () => clearTimeout(timer)
    }
  }, [started, activeStep])

  return (
    <div ref={ref} className="py-8">
      {/* Desktop: horizontal flow */}
      <div className="hidden lg:flex items-center justify-center gap-1 flex-wrap">
        {flowSteps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center relative">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-500 ${
                  i <= activeStep ? 'scale-100 opacity-100' : 'scale-75 opacity-30'
                }`}
                style={{
                  backgroundColor: i <= activeStep ? step.color : '#D1D5DB',
                  boxShadow: i <= activeStep ? `0 4px 20px ${step.color}40` : 'none',
                }}
              >
                {step.num}
              </div>
              <p className={`text-xs font-semibold mt-2 transition-all duration-300 ${i <= activeStep ? 'text-gray-800' : 'text-gray-300'}`}>
                {step.title}
              </p>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full mt-0.5 transition-all duration-300 ${
                  i <= activeStep ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundColor: step.color + '15', color: step.color }}
              >
                {step.ai}
              </span>
            </div>
            {i < flowSteps.length - 1 && (
              <div className="w-6 h-0.5 mx-1 self-start mt-7">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: i < activeStep ? '100%' : '0%',
                    background: `linear-gradient(to right, ${step.color}, ${flowSteps[i + 1].color})`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical flow */}
      <div className="lg:hidden flex flex-col gap-3">
        {flowSteps.map((step, i) => (
          <div key={i} className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 transition-all duration-500 ${
                i <= activeStep ? 'scale-100 opacity-100' : 'scale-75 opacity-30'
              }`}
              style={{
                backgroundColor: i <= activeStep ? step.color : '#D1D5DB',
              }}
            >
              {step.num}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-semibold transition-all duration-300 ${i <= activeStep ? 'text-gray-800' : 'text-gray-300'}`}>
                {step.title}
              </p>
              <span
                className={`text-[10px] transition-all duration-300 ${i <= activeStep ? 'text-gray-500' : 'text-gray-200'}`}
              >
                {step.ai}
              </span>
            </div>
            {i < flowSteps.length - 1 && (
              <div className="absolute left-5 ml-0 mt-8 w-0.5 h-4 bg-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function FloatingBlob({ color, size, top, left, delay = 0 }: { color: string; size: number; top: string; left: string; delay?: number }) {
  return (
    <div
      className="hero-blob float-animation"
      style={{
        background: color,
        width: size,
        height: size,
        top,
        left,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

const workflowSteps = [
  { num: '01', title: '多AI并行审题', desc: 'GPT + DeepSeek + 豆包同时解析题目，生成详细需求文档', color: '#7C3AED', ai: 'GPT / DS / 豆包' },
  { num: '02', title: '初版工程落地', desc: 'Claude Code自动搭建代码框架，10分钟跑通初版', color: '#8B5CF6', ai: 'Claude Code' },
  { num: '03', title: '关键纠错记录', desc: '豆包全程记录迭代日志，形成可追溯的知识资产', color: '#A78BFA', ai: '豆包' },
  { num: '04', title: '深度调研严谨化', desc: 'GPT-4o进行文献溯源和物理模型推导，确保学术严谨', color: '#C4B5FD', ai: 'GPT-4o' },
  { num: '05', title: '精调模型参数', desc: 'DeepSeek优化算法选择和参数设置，定义验收标准', color: '#7C3AED', ai: 'DeepSeek' },
  { num: '06', title: '论文整合撰写', desc: 'Kimi整合所有素材，输出格式规范的完整学术论文', color: '#FB7185', ai: 'Kimi' },
  { num: '07', title: '汇报套件生成', desc: '一键生成PPT、讲稿、演示网页和展示视频', color: '#FCD34D', ai: '多AI协同' },
]

const aiRoles = [
  { name: 'DeepSeek', role: '逻辑引擎', desc: '代码生成 · 数学推导 · 参数优化', color: '#1E40AF', bg: '#DBEAFE' },
  { name: 'GPT-4o', role: '学术大脑', desc: '文献调研 · 物理建模 · 深度分析', color: '#059669', bg: '#D1FAE5' },
  { name: 'Claude Code', role: '工程实现', desc: '自动编码 · 环境配置 · 项目构建', color: '#B45309', bg: '#FEF3C7' },
  { name: '豆包', role: '记忆中枢', desc: '进度记录 · 知识归档 · 汇报整理', color: '#BE185D', bg: '#FCE7F3' },
  { name: 'Kimi', role: '整合大师', desc: '长文整合 · 论文生成 · 格式排版', color: '#6D28D9', bg: '#F5F3FF' },
]

const painPoints = [
  { icon: '🔧', title: '工具碎片化', desc: '4-6款AI工具反复切换', stat: '78%', color: '#7C3AED' },
  { icon: '🔄', title: '经验不可复用', desc: '每次从零开始摸索', stat: '85%', color: '#FB7185' },
  { icon: '🐛', title: '代码调试反复', desc: '70%时间耗在debug', stat: '70%', color: '#F59E0B' },
  { icon: '📄', title: '格式排版繁琐', desc: 'LaTeX学习曲线陡峭', stat: '82%', color: '#10B981' },
  { icon: '🎯', title: '汇报制作耗时', desc: 'PPT+讲稿+视频工作量巨大', stat: '88%', color: '#8B5CF6' },
  { icon: '⚡', title: 'AI合规焦虑', desc: '担心AIGC检测不通过', stat: '53%', color: '#EF4444' },
]

function App() {
  // Scroll tracking for future parallax enhancements
  const [, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
              叙
            </div>
            <span className="text-xl font-bold gradient-text">叙笔 Xubi</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#philosophy" className="hover:text-purple-600 transition-colors">理念</a>
            <a href="#workflow" className="hover:text-purple-600 transition-colors">工作流</a>
            <a href="#ai-team" className="hover:text-purple-600 transition-colors">AI协同</a>
            <a href="#vision" className="hover:text-purple-600 transition-colors">哲思</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <FloatingBlob color="linear-gradient(135deg, #C4B5FD, #FBCFE8)" size={400} top="10%" left="-5%" delay={0} />
        <FloatingBlob color="linear-gradient(135deg, #FDE68A, #FBCFE8)" size={300} top="60%" left="70%" delay={2} />
        <FloatingBlob color="linear-gradient(135deg, #DDD6FE, #C4B5FD)" size={250} top="20%" left="75%" delay={4} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-purple-100 text-sm text-purple-700 mb-8">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              腾讯PCG校园AI产品创意大赛 · 开放赛道
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-6xl md:text-9xl font-black mb-4 leading-tight tracking-tight">
              <span className="gradient-text" style={{ letterSpacing: '0.15em', textShadow: '0 0 60px rgba(124,58,237,0.15)' }}>叙笔</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mb-6">
              <p className="text-xl md:text-2xl font-medium tracking-[0.3em] text-gray-600 uppercase">
                Xubi — 大学生全栈式学术创作智能伙伴
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="inline-block relative mb-8">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 rounded-2xl blur-lg opacity-30 animate-pulse" />
              <p className="relative text-2xl md:text-3xl font-light tracking-wide text-gray-800 px-6 py-3">
                <span className="font-serif italic">"叙写每一笔，成章自有时"</span>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-base text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              基于 <span className="font-semibold text-purple-600">Skill + Harness</span> 工程化理念，
              将多AI能力封装为标准化工<span>作流</span>，
              实现从题目理解到汇报展示的一站式自动化
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a
                href="#workflow"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg shadow-lg shadow-purple-200 hover:shadow-xl hover:scale-105 transition-all"
              >
                探索工作流
              </a>
              <a
                href="#philosophy"
                className="px-8 py-4 rounded-2xl bg-white text-purple-700 font-semibold text-lg border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
              >
                了解理念
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-purple-100 border border-white/50">
              <img
                src="/assets/hero_visual.jpg"
                alt="叙笔工作流程可视化"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent" />
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="glass-card rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '20万+', label: '数模竞赛参赛人数' },
              { num: '93.6%', label: '大学生AI使用率' },
              { num: '11', label: '标准化工作流阶段' },
              { num: '5', label: 'AI模型协同作战' },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100} className="text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text mb-2">{stat.num}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Flow Chart */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">全自动流水线</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-3">滚动查看，11步工作流自动点亮</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm">从审题到汇报，每一步都有明确的AI分工，像流水线一样精密运转</p>
            </div>
          </ScrollReveal>
          <FlowChartAnimation />
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">痛点洞察</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">大学生的学术焦虑，<br />我们感同身受</h2>
              <p className="text-gray-500 max-w-xl mx-auto">基于500+用户调研和亲身经历，我们发现学术写作中存在六大核心痛点</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((pain, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="glass-card rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{pain.icon}</span>
                    <span className="text-2xl font-black" style={{ color: pain.color }}>{pain.stat}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-purple-600 transition-colors">{pain.title}</h3>
                  <p className="text-sm text-gray-500">{pain.desc}</p>
                  <div className="mt-4 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: pain.stat, backgroundColor: pain.color }}
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy - Skill + Harness */}
      <section id="philosophy" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">核心方法论</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Skill + Harness</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                将人类经验蒸馏为可复用的AI技能，通过工程化驾驭实现稳定可控的学术创作
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <ScrollReveal delay={100}>
              <div className="glass-card rounded-3xl p-8 h-full border-l-4 border-purple-500">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Skill · 技能封装</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  把资深参赛者的全流程经验——从题目分析、文献检索、模型选择、代码架构到论文结构——
                  封装为标准化、可复用的"技能模板"。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  每个Skill包含：输入输出定义、完整工作流、提示词库、验收标准和避坑清单。
                  遇到新课题时，一键调用即可启动专业级创作流程。
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glass-card rounded-3xl p-8 h-full border-l-4 border-pink-400">
                <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Harness · 工程化驾驭</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  将AI使用从"随机试错"升级为"结构化工程"。通过明确的阶段划分、质量标准、
                  版本控制和迭代规范，让多AI协同变得稳定、可控、可复现。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  核心原则是"人在回路"（Human-in-the-Loop）——AI负责执行和生成，
                  人类负责决策和把关，确保学术诚信与创作质量始终处于掌控之中。
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={300}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="/assets/ai_teamwork.jpg" alt="多AI协同工作" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent flex items-end p-8">
                <p className="text-white text-lg font-medium max-w-lg">
                  不是一个人在战斗，而是一支由5大AI组成的"梦之队"，各取所长、协同作战
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Workflow Timeline */}
      <section id="workflow" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">全流程自动化</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">11步标准工作流</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                从拿到题目到提交成果，每一步都有明确的AI分工、质量标准和输出物
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            {workflowSteps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="relative flex gap-6 mb-8 last:mb-0">
                  {/* Timeline line */}
                  {i < workflowSteps.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-pink-300" />
                  )}

                  {/* Step number circle */}
                  <div
                    className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.num}
                  </div>

                  {/* Content card */}
                  <div className="glass-card rounded-2xl p-5 flex-1 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ backgroundColor: step.color + '20', color: step.color }}
                      >
                        {step.ai}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI Team */}
      <section id="ai-team" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 to-purple-50/30" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">多AI协同</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">各取所长，协同作战</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                不依赖单一模型，而是构建智能分工体系，让每个AI发挥最强能力
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {aiRoles.map((ai, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div
                  className="rounded-2xl p-6 h-full hover:shadow-xl hover:-translate-y-1 transition-all"
                  style={{ backgroundColor: ai.bg }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4"
                    style={{ backgroundColor: ai.color }}
                  >
                    {ai.name[0]}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{ai.name}</h3>
                  <p className="text-sm font-medium mb-2" style={{ color: ai.color }}>{ai.role}</p>
                  <p className="text-sm text-gray-600">{ai.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study - Electrodynamics Project */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-white/30 to-pink-50/30" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">真实验证</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">已有完整实践验证</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                叙笔的工作流并非纸上谈兵——我们的团队已用电动力学项目化学习完整验证了这一方法论
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="glass-card rounded-3xl p-8 md:p-10 mb-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-4">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    项目已开源
                  </div>
                  <h3 className="text-2xl font-bold mb-3">基于深度学习的超构表面单元逆向设计</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    这是电动力学课程的项目化学习实践。我们使用叙笔的"Skill + Harness"工作流，
                    从拿到课题到最终汇报，完整经历了11个标准化阶段。最终成果包括：
                    可运行的深度学习代码库、完整的技术论文、演示PPT和汇报视频。
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">Python</span>
                    <span className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-medium">深度学习</span>
                    <span className="px-3 py-1 rounded-lg bg-pink-50 text-pink-700 text-xs font-medium">物理建模</span>
                    <span className="px-3 py-1 rounded-lg bg-yellow-50 text-yellow-700 text-xs font-medium">超构表面</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://github.com/Hu-yuancai/Project-Based-Learning-of-Electrodynamics-Electrodynamics-Project-Based-Learning-/tree/v3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      查看项目代码 v3
                    </a>
                    <a
                      href="https://www.bilibili.com/video/BV1LToEBDEip"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                      </svg>
                      观看演示视频
                    </a>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-purple-100 to-pink-100 aspect-video flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <p className="text-gray-700 font-semibold mb-1">电动力学项目化学习</p>
                    <p className="text-gray-500 text-sm">逆向设计超构表面单元</p>
                    <p className="text-purple-600 text-xs mt-2 font-medium">完整实践了叙笔工作流</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: '使用的AI工具', value: '5个', color: '#7C3AED' },
                { label: '工作流阶段', value: '11步', color: '#8B5CF6' },
                { label: '代码迭代版本', value: 'v3', color: '#FB7185' },
                { label: '最终成果', value: '论文+PPT+视频', color: '#F59E0B' },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-2xl p-5 text-center hover:shadow-lg transition-shadow">
                  <p className="text-2xl font-black mb-1" style={{ color: item.color }}>{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision / Philosophy */}
      <section id="vision" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <img
                  src="/assets/presenting.jpg"
                  alt="学术汇报场景"
                  className="rounded-3xl shadow-2xl shadow-purple-100 w-full"
                />
                <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-4 shadow-xl">
                  <div className="text-3xl font-black gradient-text">74h</div>
                  <div className="text-xs text-gray-500">数模竞赛极限时间</div>
                </div>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal delay={100}>
                <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">价值思考</span>
                <h2 className="text-4xl font-bold mt-3 mb-6">当AI能完成一切，<br />人的价值在哪里？</h2>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="text-gray-600 leading-relaxed mb-4">
                  这是创始团队在实践中最深的困惑：当自己的全部经验可以被AI完整蒸馏为Skill，
                  人类独特的价值究竟是什么？
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <p className="text-gray-600 leading-relaxed mb-4">
                  叙笔给出的答案是：<span className="font-semibold text-purple-600">从执行者升维为架构师</span>。
                  设计更好的Skill、优化Harness流程、提出更有深度的问题——
                  这些才是人类不可替代的创造力所在。
                </p>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <p className="text-gray-600 leading-relaxed mb-6">
                  AI可以生成完美的代码，但只有人类能判断这段代码是否真正解决了有价值的问题；
                  AI可以写出流畅的论文，但只有人类能提出原创性的学术洞见。
                  叙笔不是要取代思考，而是将学生从繁琐的重复劳动中解放出来，聚焦于真正有创造性的探索。
                </p>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <p className="text-purple-800 font-medium italic">
                    "叙写每一笔，成章自有时"——当每一笔创作都有AI的精准辅助，高质量学术成果的达成只是时间问题。
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%237C3AED%22%20fill-opacity%3D%220.06%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">关于这个Demo</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-700">
              您现在看到的这个网页，正是叙笔理念的具象化呈现。
              我们的核心创意已经验证可行，但受限于团队的技术经验，
              我们尚未完成小程序开发和云端部署。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl leading-relaxed mb-10 text-gray-700">
              我们真诚地寻求技术导师和行业前辈的指导，
              特别是在云架构设计、小程序开发和AI合规安全方面的建议。
              如果您认可这个创意，愿意帮助我们把它变成现实，请联系我们。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="glass-card rounded-2xl p-8 inline-block shadow-xl">
              <p className="text-2xl font-bold mb-2 gradient-text">叙笔 Xubi</p>
              <p className="text-sm text-gray-600">叙写每一笔，成章自有时</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white/50 border-t border-purple-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
              叙
            </div>
            <span className="text-lg font-bold gradient-text">叙笔 Xubi</span>
          </div>
          <p className="text-sm text-gray-400">
            腾讯PCG校园AI产品创意大赛 · 开放赛道 · 2025年5月
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
