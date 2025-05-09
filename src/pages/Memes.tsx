
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Laugh, ThumbsUp, MessageSquare, Share2, Bookmark } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

const Memes = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('trending');
  
  const memeData = [
    {
      id: 1,
      title: "Когда отлаживаешь production",
      image: "/placeholder.svg",
      author: "Pechenie",
      likes: 423,
      comments: 32
    },
    {
      id: 2,
      title: "Junior vs Senior",
      image: "/placeholder.svg",
      author: "Quazylix",
      likes: 287,
      comments: 19
    },
    {
      id: 3,
      title: "ИИ захватывает мир",
      image: "/placeholder.svg",
      author: "Bowser",
      likes: 519,
      comments: 47
    },
    {
      id: 4,
      title: "Баги в коде",
      image: "/placeholder.svg",
      author: "CyberYaga",
      likes: 176,
      comments: 12
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-prism-dark text-white">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-prism-accent to-prism-accent-2 text-transparent bg-clip-text">
                МЕМЫ
              </span>
            </h1>
            
            {user && (
              <Button className="bg-gradient-to-r from-prism-accent to-prism-accent-2">
                <Laugh className="mr-2 h-4 w-4" />
                Создать мем
              </Button>
            )}
          </div>
          
          <div className="mb-8">
            <Input 
              placeholder="Поиск мемов..." 
              className="bg-black/30 border-prism-muted/30 text-white placeholder:text-gray-500"
            />
          </div>
          
          <Tabs defaultValue="trending" className="mb-8">
            <TabsList className="bg-black/30 border border-prism-muted/30">
              <TabsTrigger 
                value="trending" 
                className="data-[state=active]:bg-prism-accent/20 data-[state=active]:text-prism-accent"
              >
                Популярные
              </TabsTrigger>
              <TabsTrigger 
                value="new" 
                className="data-[state=active]:bg-prism-accent/20 data-[state=active]:text-prism-accent"
              >
                Новые
              </TabsTrigger>
              <TabsTrigger 
                value="ai" 
                className="data-[state=active]:bg-prism-accent/20 data-[state=active]:text-prism-accent"
              >
                ИИ-генерированные
              </TabsTrigger>
              {user && (
                <TabsTrigger 
                  value="saved" 
                  className="data-[state=active]:bg-prism-accent/20 data-[state=active]:text-prism-accent"
                >
                  Сохраненные
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="trending" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {memeData.map((meme) => (
                  <Card key={meme.id} className="bg-black/30 backdrop-blur-sm border-prism-muted/30 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-3 border-b border-prism-muted/20">
                        <h3 className="font-medium text-gray-200">{meme.title}</h3>
                        <p className="text-xs text-gray-400">Автор: {meme.author}</p>
                      </div>
                      <div className="aspect-square bg-black flex items-center justify-center overflow-hidden">
                        <img src={meme.image} alt={meme.title} className="w-full h-full object-contain" />
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 flex justify-between">
                      <div className="flex space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-prism-accent">
                          <ThumbsUp className="h-4 w-4 mr-1" /> {meme.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-prism-accent">
                          <MessageSquare className="h-4 w-4 mr-1" /> {meme.comments}
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-prism-accent">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-prism-accent">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="new" className="mt-6">
              <div className="text-center py-12 border border-prism-muted/20 rounded-lg bg-black/20">
                <Laugh size={48} className="mx-auto mb-4 text-gray-500" />
                <h3 className="text-xl text-gray-300">Новые мемы загружаются</h3>
                <p className="text-gray-500">Заходите позже</p>
              </div>
            </TabsContent>
            
            <TabsContent value="ai" className="mt-6">
              <div className="text-center py-12 border border-prism-muted/20 rounded-lg bg-black/20">
                <Laugh size={48} className="mx-auto mb-4 text-gray-500" />
                <h3 className="text-xl text-gray-300">ИИ думает над новыми мемами</h3>
                <p className="text-gray-500">Скоро будет готово</p>
              </div>
            </TabsContent>
            
            {user && (
              <TabsContent value="saved" className="mt-6">
                <div className="text-center py-12 border border-prism-muted/20 rounded-lg bg-black/20">
                  <Bookmark size={48} className="mx-auto mb-4 text-gray-500" />
                  <h3 className="text-xl text-gray-300">У вас пока нет сохраненных мемов</h3>
                  <p className="text-gray-500">Нажмите на иконку закладки, чтобы сохранить мем</p>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Memes;
