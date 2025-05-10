
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FlaskConical, Zap, Atom, Brain, Lock, Plus, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const experimentSchema = z.object({
  title: z.string().min(5, { message: 'Название должно содержать минимум 5 символов' }),
  description: z.string().min(10, { message: 'Описание должно содержать минимум 10 символов' }),
  progress: z.number().min(0).max(100),
});

const Laboratory = () => {
  const { user, profile } = useAuth();
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof experimentSchema>>({
    resolver: zodResolver(experimentSchema),
    defaultValues: {
      title: '',
      description: '',
      progress: 0,
    },
  });
  
  useEffect(() => {
    const fetchExperiments = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('lab_experiments')
          .select(`
            *,
            profiles:user_id (username, avatar_url)
          `)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setExperiments(data || []);
      } catch (err) {
        console.error('Ошибка при загрузке экспериментов:', err);
        toast.error('Не удалось загрузить список экспериментов');
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperiments();
  }, []);

  const onSubmit = async (values: z.infer<typeof experimentSchema>) => {
    if (!user) {
      toast.error('Необходимо авторизоваться для создания эксперимента');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('lab_experiments')
        .insert({
          title: values.title,
          description: values.description,
          progress: values.progress,
          user_id: user.id,
          status: values.progress === 100 ? 'завершен' : 'в процессе',
          contributors: 1,
        })
        .select(`
          *,
          profiles:user_id (username, avatar_url)
        `)
        .single();
        
      if (error) throw error;
      
      setExperiments([data, ...experiments]);
      toast.success('Эксперимент успешно создан!');
      form.reset();
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Ошибка при создании эксперимента:', err);
      toast.error('Не удалось создать эксперимент');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-purple-700">
                    <FlaskConical className="mr-2 h-4 w-4" />
                    Новый эксперимент
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-prism-dark border-prism-muted">
                  <DialogHeader>
                    <DialogTitle>Создание нового эксперимента</DialogTitle>
                    <DialogDescription>
                      Опишите ваш эксперимент и его текущий прогресс
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Название эксперимента</FormLabel>
                            <FormControl>
                              <Input placeholder="Введите название" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Описание</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Опишите ваш эксперимент" 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="progress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Прогресс: {field.value}%</FormLabel>
                            <FormControl>
                              <Slider
                                min={0}
                                max={100}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="py-4"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter className="pt-4">
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-prism-accent to-purple-700"
                        >
                          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Создать
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 size={40} className="text-prism-accent animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiments.length === 0 ? (
                <div className="col-span-full p-8 border border-prism-muted/30 rounded-lg bg-black/30 backdrop-blur-sm text-center">
                  <FlaskConical size={40} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Нет экспериментов</h3>
                  <p className="text-gray-400 mb-6">Создайте первый эксперимент и начните работу</p>
                  
                  {user ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-prism-accent to-purple-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Начать эксперимент
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-prism-dark border-prism-muted">
                        {/* Duplicate form code from above would go here */}
                        <DialogHeader>
                          <DialogTitle>Создание нового эксперимента</DialogTitle>
                          <DialogDescription>
                            Опишите ваш эксперимент и его текущий прогресс
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Название эксперимента</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Введите название" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Описание</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Опишите ваш эксперимент" 
                                      className="min-h-[100px]"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="progress"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Прогресс: {field.value}%</FormLabel>
                                  <FormControl>
                                    <Slider
                                      min={0}
                                      max={100}
                                      step={1}
                                      defaultValue={[field.value]}
                                      onValueChange={(value) => field.onChange(value[0])}
                                      className="py-4"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <DialogFooter className="pt-4">
                              <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-prism-accent to-purple-700"
                              >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Создать
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button 
                      className="bg-gradient-to-r from-prism-accent to-purple-700"
                      onClick={() => window.location.href = '/auth'}
                    >
                      Войти и начать
                    </Button>
                  )}
                </div>
              ) : (
                experiments.map((experiment) => (
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
                        <div>Создатель: <span className="text-gray-300">{experiment.profiles?.username || 'Неизвестный'}</span></div>
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
                ))
              )}
            </div>
          )}
          
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
