import { useState } from 'react';
import { BrainCircuit, Mic, Send, BookOpen, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
// Asegúrate de importar tu componente Button real
import { Button } from '@/core/components/buttons/button'; 

export default function PlacementTestMockView() {
    const [studentText, setStudentText] = useState<string>('');
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [analysisResult, setAnalysisResult] = useState<{ level: string; confidence: number } | null>(null);

    const handleAnalyzeText = () => {
        if (!studentText.trim()) return;
        
        setIsAnalyzing(true);
        setAnalysisResult(null);

        // Simulamos el tiempo de respuesta del microservicio de Python (NLP)
        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisResult({
                level: 'B1',
                confidence: 87
            });
        }, 2000);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            {/* --- CABECERA --- */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                    <BrainCircuit className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-title">Examen de Ubicación Inteligente</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">
                        Evaluación automatizada mediante Procesamiento de Lenguaje Natural (NLP)
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* --- ÁREA DE CAPTURA DE TEXTO --- */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden flex flex-col">
                        <div className="px-5 py-4 border-b border-border/50 bg-muted/30">
                            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-primary-foreground" />
                                Pregunta Detonante
                            </h3>
                            <p className="text-sm text-foreground/80 mt-2 font-medium italic">
                                "Please introduce yourself, describe your last vacation, and tell us about your future professional goals."
                            </p>
                        </div>
                        
                        <div className="p-5 flex-grow">
                            <textarea
                                value={studentText}
                                onChange={(e) => setStudentText(e.target.value)}
                                placeholder="El estudiante escribirá su respuesta aquí..."
                                className="w-full h-48 resize-none bg-transparent border-0 focus:ring-0 p-0 text-foreground placeholder:text-muted-foreground text-sm"
                                disabled={isAnalyzing}
                            />
                        </div>

                        <div className="px-5 py-3 border-t border-border/50 bg-muted/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {/* Botón visual para el truco de la Web Speech API */}
                                <button 
                                    type="button"
                                    className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                                    title="Dictar por voz (Web Speech API)"
                                >
                                    <Mic className="w-4 h-4" />
                                </button>
                                <span className="text-xs text-muted-foreground">
                                    {studentText.split(' ').filter(word => word.length > 0).length} palabras
                                </span>
                            </div>
                            
                            <Button 
                                onClick={handleAnalyzeText} 
                                disabled={isAnalyzing || studentText.length === 0}
                            >
                                {isAnalyzing ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando NLP...</>
                                ) : (
                                    <><Send className="mr-2 h-4 w-4" /> Evaluar Nivel</>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* --- ÁREA DE RESULTADOS (IA) --- */}
                <div className="lg:col-span-2">
                    {isAnalyzing && (
                        <div className="h-full bg-card rounded-xl border border-border/50 shadow-sm flex flex-col items-center justify-center p-8 text-center animate-pulse">
                            <BrainCircuit className="w-12 h-12 text-primary/40 mb-4 animate-bounce" />
                            <h3 className="font-semibold text-foreground">Vectorizando texto...</h3>
                            <p className="text-xs text-muted-foreground mt-2">
                                Consultando modelo clasificador en microservicio Python
                            </p>
                        </div>
                    )}

                    {!isAnalyzing && analysisResult && (
                        <div className="h-full bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden flex flex-col">
                            <div className="bg-primary-foreground p-6 text-center">
                                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                                <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-1">Nivel Predicho</h3>
                                <p className="text-5xl font-bold text-white">{analysisResult.level}</p>
                            </div>
                            
                            <div className="p-6 space-y-6 flex-grow flex flex-col justify-center">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-foreground">Confianza del Modelo</span>
                                        <span className="text-sm font-bold text-title">{analysisResult.confidence}%</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2.5">
                                        <div 
                                            className="bg-primary-foreground h-2.5 rounded-full transition-all duration-1000 ease-out" 
                                            style={{ width: `${analysisResult.confidence}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                                    <p className="text-xs text-foreground/80 leading-relaxed">
                                        El algoritmo SVM ha detectado un uso consistente de tiempos verbales mixtos y vocabulario intermedio, descartando A2 y sugiriendo fuertemente el módulo de <strong>Intermedio B1</strong>.
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 border-t border-border/50 bg-muted/30">
                                <Button className="w-full" variant="default">
                                    Asignar Módulo B1 <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {!isAnalyzing && !analysisResult && (
                        <div className="h-full bg-muted/30 rounded-xl border border-dashed border-border flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
                                <BrainCircuit className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Esperando texto del estudiante para realizar la predicción.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}