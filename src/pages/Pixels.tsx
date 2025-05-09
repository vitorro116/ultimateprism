
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Grid2X2, Users, Clock, Crown, Eye, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

const Pixels = () => {
  const { user } = useAuth();
  
  // Моковые данные о текущем состоянии пиксельной войны
  const stats = {
    totalUsers: 1248,
    pixelsPlaced: 876543,
    lastUpdate: "2 минуты назад",
    currentBattle: "Зона А-7 (Северо-западный сектор)"
  };
  
  // Фракции, участвующие в пиксельной войне
  const factions = [
    {
      id: 1,
      name: "Синтетики",
      color: "#3b82f6",
      members: 427,
      territory: "32%",
      leader: "DarkMatrix"
    },
    {
      id: 2,
      name: "Органики",
      color: "#10b981",
      members: 389,
      territory: "28%",
      leader: "GreenThought"
    },
    {
      id: 3,
      name: "Нейтралы",
      color: "#f59e0b",
      members: 224,
      territory: "17%",
      leader: "BalanceMaster"
    },
    {
      id: 4,
      name: "Хаос",
      color: "#ef4444",
      members: 208,
      territory: "23%",
      leader: "EntropyLord"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-prism-dark text-white">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-prism-accent to-emerald-400 text-transparent bg-clip-text">
              ПИКСЕЛЬНАЯ ВОЙНА
            </span>
          </h1>
          <p className="text-gray-400 mb-8 max-w-2xl">
            Захватывайте территории, размещая пиксели своего цвета. Объединяйтесь в фракции, 
            создавайте альянсы и доминируйте на карте пиксельного мира.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Card className="bg-black/30 backdrop-blur-sm border-prism-muted/30 h-full">
                <CardHeader className="pb-2">
                  <CardTitle>Карта пиксельного мира</CardTitle>
                  <CardDescription>Текущее состояние</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gray-900/50 border border-prism-muted/30 rounded-md flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-16" style={{ opacity: 0.3 }}>
                      {[...Array(256)].map((_, i) => (
                        <div key={i} className="aspect-square border border-gray-800/20"></div>
                      ))}
                    </div>
                    
                    <div className="text-center">
                      <Grid2X2 size={48} className="mx-auto mb-4 text-gray-600" />
                      <p className="text-gray-400">Загрузка карты пиксельного мира...</p>
                      <p className="text-gray-500 text-sm mt-2">Обработка данных от {stats.totalUsers} участников</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-prism-muted/30 pt-4">
                  <div className="flex space-x-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Users size={14} className="mr-1" /> {stats.totalUsers}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock size={14} className="mr-1" /> {stats.lastUpdate}
                    </div>
                  </div>
                  
                  <Button disabled={!user} className="bg-gradient-to-r from-prism-accent to-emerald-400">
                    {user ? 'Разместить пиксель' : 'Войдите для участия'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-black/30 backdrop-blur-sm border-prism-muted/30">
                <CardHeader>
                  <CardTitle>Текущая битва</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-4 border border-prism-accent/20 rounded-md bg-prism-accent/5 mb-4">
                    <h3 className="font-bold text-lg text-prism-accent mb-1">{stats.currentBattle}</h3>
                    <p className="text-sm text-gray-400">Горячая точка прямо сейчас!</p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center text-blue-400">
                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                        Синтетики
                      </span>
                      <span className="text-gray-400">42%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center text-green-400">
                        <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                        Органики
                      </span>
                      <span className="text-gray-400">38%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center text-red-400">
                        <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                        Хаос
                      </span>
                      <span className="text-gray-400">20%</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-prism-muted/30 pt-4">
                  <Button variant="outline" className="w-full border-prism-muted/50">
                    <Eye size={16} className="mr-2" /> Наблюдать за битвой
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-black/30 backdrop-blur-sm border-prism-muted/30">
                <CardHeader>
                  <CardTitle>Топ фракций</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {factions.map((faction, index) => (
                    <div key={faction.id} className="flex items-center">
                      {index === 0 && <Crown size={16} className="text-yellow-400 mr-2" />}
                      <div 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: faction.color }}
                      ></div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-200">{faction.name}</span>
                          <span className="text-sm text-gray-400">{faction.territory}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {faction.members} участников • Лидер: {faction.leader}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t border-prism-muted/30 pt-4">
                  {user ? (
                    <Button className="w-full bg-gradient-to-r from-prism-accent to-emerald-400">
                      <Sparkles size={16} className="mr-2" /> Присоединиться к фракции
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-black/50">
                      Войдите для присоединения к фракции
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div className="border border-prism-muted/30 rounded-lg p-6 bg-black/30 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Как работает пиксельная война</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <div className="w-12 h-12 rounded-full bg-prism-accent/20 text-prism-accent flex items-center justify-center mx-auto mb-3">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-medium mb-2">Выберите сторону</h3>
                <p className="text-sm text-gray-400">Присоединитесь к одной из фракций или создайте свою собственную</p>
              </div>
              
              <div className="p-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Grid2X2 size={24} />
                </div>
                <h3 className="text-lg font-medium mb-2">Размещайте пиксели</h3>
                <p className="text-sm text-gray-400">Каждые 5 минут вы можете разместить один пиксель вашего цвета</p>
              </div>
              
              <div className="p-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                  <Crown size={24} />
                </div>
                <h3 className="text-lg font-medium mb-2">Захватывайте территории</h3>
                <p className="text-sm text-gray-400">Координируйтесь с соратниками для захвата стратегических зон</p>
              </div>
              
              <div className="p-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-lg font-medium mb-2">Получайте награды</h3>
                <p className="text-sm text-gray-400">Победившая фракция получает особые привилегии и награды</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pixels;
