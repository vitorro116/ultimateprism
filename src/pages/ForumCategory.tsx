
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter 
} from '@/components/ui/card';
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, MessageSquare, PlusCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

const topicSchema = z.object({
  title: z.string().min(5, { message: 'Название должно содержать минимум 5 символов' }),
  content: z.string().min(10, { message: 'Содержание должно содержать минимум 10 символов' }),
});

const ForumCategory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [category, setCategory] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof topicSchema>>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    const fetchCategoryAndTopics = async () => {
      setLoading(true);
      try {
        // Загрузка категории
        const { data: categoryData, error: categoryError } = await supabase
          .from('forum_categories')
          .select('*')
          .eq('id', id)
          .single();
          
        if (categoryError) throw categoryError;
        setCategory(categoryData);
        
        // Загрузка тем в этой категории
        const { data: topicsData, error: topicsError } = await supabase
          .from('forum_topics')
          .select(`
            *,
            profiles:user_id (username, avatar_url),
            post_count:forum_posts(count)
          `)
          .eq('category_id', id)
          .order('is_pinned', { ascending: false })
          .order('created_at', { ascending: false });
          
        if (topicsError) throw topicsError;
        setTopics(topicsData || []);
        
      } catch (err: any) {
        setError(err.message);
        console.error('Ошибка при загрузке данных:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchCategoryAndTopics();
  }, [id]);

  const onSubmit = async (values: z.infer<typeof topicSchema>) => {
    if (!user) {
      toast.error('Необходимо авторизоваться для создания темы');
      navigate('/auth');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Создаем новую тему
      const { data: topicData, error: topicError } = await supabase
        .from('forum_topics')
        .insert({
          title: values.title,
          content: values.content,
          user_id: user.id,
          category_id: id,
        })
        .select()
        .single();
        
      if (topicError) throw topicError;
      
      toast.success('Тема успешно создана!');
      setIsDialogOpen(false);
      form.reset();
      navigate(`/forum/topic/${topicData.id}`);
      
    } catch (err: any) {
      toast.error(err.message || 'Ошибка при создании темы');
      console.error('Ошибка при создании темы:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-prism-dark flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-12 flex justify-center items-center">
          <div className="animate-pulse text-prism-accent">Загрузка...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-prism-dark flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
          <Card className="bg-red-900/20 border-red-500/50 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <p className="text-red-300">
                {error || 'Категория не найдена'} 
              </p>
              <Button 
                className="mt-4" 
                variant="outline" 
                onClick={() => navigate('/forum')}
              >
                Вернуться к списку категорий
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-prism-dark flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center mb-2">
                <Link 
                  to="/forum"
                  className="text-gray-400 hover:text-prism-accent transition-colors"
                >
                  Форум
                </Link>
                <span className="mx-2 text-gray-600">/</span>
                <h1 className="text-xl font-semibold text-white">{category.name}</h1>
              </div>
              <p className="text-gray-400">{category.description}</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-prism-accent to-prism-accent-2">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Создать тему
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-prism-dark border-prism-muted max-w-xl">
                <DialogHeader>
                  <DialogTitle>Создание новой темы</DialogTitle>
                  <DialogDescription>
                    В категории: {category.name}
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Название темы</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите название темы" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Содержание</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Введите содержание первого поста" 
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-prism-accent to-prism-accent-2"
                      >
                        {isSubmitting ? 'Создание...' : 'Создать тему'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          {topics.length === 0 ? (
            <Card className="bg-black/30 backdrop-blur-md border-prism-muted/30 text-center py-12">
              <CardContent>
                <p className="text-gray-400 mb-4">В этой категории пока нет тем</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-prism-accent to-prism-accent-2">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Создать первую тему
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-prism-dark border-prism-muted max-w-xl">
                    <DialogHeader>
                      <DialogTitle>Создание новой темы</DialogTitle>
                      <DialogDescription>
                        В категории: {category.name}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Название темы</FormLabel>
                              <FormControl>
                                <Input placeholder="Введите название темы" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Содержание</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Введите содержание первого поста" 
                                  className="min-h-[150px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-prism-accent to-prism-accent-2"
                          >
                            {isSubmitting ? 'Создание...' : 'Создать тему'}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {topics.map((topic) => (
                <Link to={`/forum/topic/${topic.id}`} key={topic.id}>
                  <Card 
                    className={`
                      bg-black/30 backdrop-blur-md border-prism-muted/30 
                      hover:border-prism-accent/50 transition-all duration-300
                      ${topic.is_pinned ? 'border-l-4 border-l-prism-accent' : ''}
                    `}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{topic.title}</CardTitle>
                        {topic.is_pinned && (
                          <div className="px-2 py-1 rounded text-xs bg-prism-accent text-white">
                            Закреплено
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="py-2">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={topic.profiles?.avatar_url || ''} />
                          <AvatarFallback className="bg-prism-accent text-white">
                            {topic.profiles?.username?.charAt(0)?.toUpperCase() || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm text-gray-400">
                          {topic.profiles?.username || 'Неизвестный пользователь'}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-2 flex justify-between items-center text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{topic.post_count?.[0]?.count || 0} ответов</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{topic.view_count} просмотров</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          {formatDistanceToNow(new Date(topic.created_at), { 
                            addSuffix: true,
                            locale: ru 
                          })}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForumCategory;
