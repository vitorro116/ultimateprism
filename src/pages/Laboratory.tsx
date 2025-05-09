
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FlaskConical, Zap, Atom, Brain, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

const Laboratory = () => {
  const { user } = useAuth();
  
  const experiments = [
    {
      id: 1,
      title: "Нейронная сеть для распознавания эмоций",
      description: "Обучение модели машинного обучения для определения эмоционального состояния пользователя по тексту",
      progress: 68,
      status: "в процессе",
      creator: "Quazylix",
      contributors: 7,
      locked: false
    },
    {
      id: 2,
      title: "Прототип квантового компьютера",
      description: "Симуляция работы квантовых вычислений в виртуальной среде",
      progress: 32,
      status: "в процессе",
      creator: "Bowser",
      contributors: 4,
      locked: false
    },
    {
      id: 3,
      title: "Генератор альтернативных реальностей",
      description: "Алгоритм для создания последовательных и логически непротиворечивых параллельных миров",
      progress: 100,
      status: "завершен",
      creator: "Pechenie",
      contributors: 12,
      locked: false
    },
    {
      id: 4,
      title: "Система предсказания будущего",
      description: "Секретный проект по анализу временных линий и потенциальных вариантов развития событий",
      progress: 15,
      status: "закрыт",
      creator: "Администрация",
      contributors: 3,
      locked: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-prism-dark text-white">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-prism-accent to-purple-400 text-transparent bg-clip-text">
                  ЛАБОРАТОРИЯ
                </span>
              </h1>
              <p className="text-gray-400">Зона экспериментальных проектов и безумных идей</p>
            </div>
            
            {user && (
              <Button className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-purple-700">
                <FlaskConical className="mr-2 h-4 w-4" />
                Новый эксперимент
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((experiment) => (
              <Card 
                key={experiment.id} 
                className={`bg-black/30 backdrop-blur-sm border-prism-muted/30 overflow-hidden ${experiment.locked ? 'opacity-80' : ''}`}
              >
                <CardHeader>
                  <div className="flex justify-between">
                    <Badge 
                      variant="outline" 
                      className={`
                        ${experiment.status === 'в процессе' ? 'border-prism-accent text-prism-accent' : 
                          experiment.status === 'завершен' ? 'border-green-500 text-green-500' : 
                          'border-red-400 text-red-400'}
                      `}
                    >
                      {experiment.status}
                    </Badge>
                    {experiment.locked && <Lock size={16} className="text-red-400" />}
                  </div>
                  <CardTitle className="text-xl font-bold text-white mt-2">{experiment.title}</CardTitle>
                  <CardDescription className="text-gray-400">{experiment.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Прогресс</span>
                      <span className="text-prism-accent">{experiment.progress}%</span>
                    </div>
                    <Progress 
                      value={experiment.progress} 
                      className="h-2 bg-prism-muted/30" 
                    />
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    <div>Создатель: <span className="text-gray-300">{experiment.creator}</span></div>
                    <div>Участников: <span className="text-gray-300">{experiment.contributors}</span></div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    disabled={experiment.locked}
                    className="w-full bg-black/50 hover:bg-black/70 border border-prism-muted/50"
                  >
                    {experiment.locked ? 'Доступ запрещен' : 'Просмотреть детали'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 p-6 border border-purple-500/20 rounded-lg bg-black/30 backdrop-blur-sm">
            <div className="flex items-start mb-6">
              <div className="p-3 rounded-full bg-purple-900/30 mr-4">
                <Brain size={32} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Научный центр</h3>
                <p className="text-gray-400">
                  Здесь собраны ресурсы и инструменты для проведения экспериментов и исследований
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-prism-muted/20 rounded-lg bg-black/20">
                <Zap size={24} className="text-yellow-400 mb-2" />
                <h4 className="text-lg font-medium text-white mb-1">Вычислительные ресурсы</h4>
                <p className="text-sm text-gray-400">Высокопроизводительные кластеры для сложных расчетов</p>
              </div>
              
              <div className="p-4 border border-prism-muted/20 rounded-lg bg-black/20">
                <Atom size={24} className="text-blue-400 mb-2" />
                <h4 className="text-lg font-medium text-white mb-1">Библиотека знаний</h4>
                <p className="text-sm text-gray-400">Доступ к научным публикациям и исследованиям</p>
              </div>
              
              <div className="p-4 border border-prism-muted/20 rounded-lg bg-black/20">
                <FlaskConical size={24} className="text-green-400 mb-2" />
                <h4 className="text-lg font-medium text-white mb-1">Инструментарий</h4>
                <p className="text-sm text-gray-400">Набор инструментов для экспериментов и исследований</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Laboratory;
