
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
  Card, CardContent, CardHeader, CardTitle, CardFooter 
} from '@/components/ui/card';
import { 
  Form, FormControl, FormField, FormItem, FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Reply, MessageSquare, Eye } from 'lucide-react';

const replySchema = z.object({
  content: z.string().min(5, { message: 'Ответ должен содержать минимум 5 символов' }),
});

const ForumTopic = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [topic, setTopic] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: '',
    },
  });

  useEffect(() => {
    const fetchTopicAndPosts = async () => {
      setLoading(true);
      try {
        // Увеличиваем счетчик просмотров
        if (id) {
          await supabase.rpc('increment_topic_views', { topic_id: id });
        }
        
        // Загрузка темы
        const { data: topicData, error: topicError } = await supabase
          .from('forum_topics')
          .select(`
            *,
            profiles:user_id (username, avatar_url),
            categories:category_id (*)
          `)
          .eq('id', id)
          .single();
          
        if (topicError) throw topicError;
        setTopic(topicData);
        setCategory(topicData.categories);
        
        // Загрузка первого поста (содержимое темы) и ответов
        const { data: postsData, error: postsError } = await supabase
          .from('forum_posts')
          .select(`
            *,
            profiles:user_id (username, avatar_url)
          `)
          .eq('topic_id', id)
          .order('created_at', { ascending: true });
          
        if (postsError) throw postsError;
        setPosts(postsData || []);
        
      } catch (err: any) {
        setError(err.message);
        console.error('Ошибка при загрузке данных:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchTopicAndPosts();
  }, [id]);

  const onSubmit = async (values: z.infer<typeof replySchema>) => {
    if (!user) {
      toast.error('Необходимо авторизоваться для ответа');
      navigate('/auth');
      return;
    }
    
    if (!id) return;
    
    setIsSubmitting(true);
    
    try {
      // Создаем новый ответ
      const { data: postData, error: postError } = await supabase
        .from('forum_posts')
        .insert({
          content: values.content,
          user_id: user.id,
          topic_id: id,
        })
        .select(`
          *,
          profiles:user_id (username, avatar_url)
        `)
        .single();
        
      if (postError) throw postError;
      
      toast.success('Ответ успешно добавлен!');
      form.reset();
      
      // Добавляем новый пост к существующим
      setPosts([...posts, postData]);
      
    } catch (err: any) {
      toast.error(err.message || 'Ошибка при добавлении ответа');
      console.error('Ошибка при добавлении ответа:', err);
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

  if (error || !topic) {
    return (
      <div className="min-h-screen bg-prism-dark flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
          <Card className="bg-red-900/20 border-red-500/50 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <p className="text-red-300">
                {error || 'Тема не найдена'} 
              </p>
              <Button 
                className="mt-4" 
                variant="outline" 
                onClick={() => navigate('/forum')}
              >
                Вернуться к форуму
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
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Link 
                to="/forum"
                className="text-gray-400 hover:text-prism-accent transition-colors"
              >
                Форум
              </Link>
              <span className="mx-2 text-gray-600">/</span>
              <Link 
                to={`/forum/category/${category.id}`}
                className="text-gray-400 hover:text-prism-accent transition-colors"
              >
                {category.name}
              </Link>
              <span className="mx-2 text-gray-600">/</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{topic.title}</h1>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{posts.length} ответов</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{topic.view_count} просмотров</span>
                </div>
              </div>
              
              <div>
                {format(new Date(topic.created_at), 'PPP', { locale: ru })}
              </div>
            </div>
          </div>
          
          {/* Основной пост темы */}
          <Card className="bg-black/30 backdrop-blur-md border-prism-muted/30 mb-6">
            <CardHeader className="border-b border-prism-muted/20 flex flex-row items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={topic.profiles?.avatar_url || ''} />
                <AvatarFallback className="bg-prism-accent text-white">
                  {topic.profiles?.username?.charAt(0)?.toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{topic.profiles?.username}</CardTitle>
                <div className="text-xs text-gray-400">
                  Автор темы
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="py-6">
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-line">{topic.content}</p>
              </div>
            </CardContent>
            
            <CardFooter className="text-xs text-gray-400 border-t border-prism-muted/20">
              {format(new Date(topic.created_at), 'PPPPp', { locale: ru })}
            </CardFooter>
          </Card>
          
          {/* Ответы */}
          {posts.length > 0 && (
            <div className="space-y-6 mb-8">
              {posts.map((post) => (
                <Card 
                  key={post.id}
                  className="bg-black/30 backdrop-blur-md border-prism-muted/30"
                >
                  <CardHeader className="border-b border-prism-muted/20 flex flex-row items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.profiles?.avatar_url || ''} />
                      <AvatarFallback className="bg-prism-accent text-white">
                        {post.profiles?.username?.charAt(0)?.toUpperCase() || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{post.profiles?.username}</CardTitle>
                      <div className="text-xs text-gray-400">
                        Участник
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="py-6">
                    <div className="prose prose-invert max-w-none">
                      <p className="whitespace-pre-line">{post.content}</p>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="text-xs text-gray-400 border-t border-prism-muted/20">
                    {format(new Date(post.created_at), 'PPPPp', { locale: ru })}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {/* Форма ответа */}
          <Card className="bg-black/30 backdrop-blur-md border-prism-muted/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Reply className="mr-2 h-5 w-5" />
                Ваш ответ
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {user ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea 
                              placeholder="Введите ваш ответ..." 
                              className="min-h-[120px]"
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
                        {isSubmitting ? 'Отправка...' : 'Отправить ответ'}
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400 mb-4">Авторизуйтесь, чтобы оставить ответ</p>
                  <Button 
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-prism-accent to-prism-accent-2"
                  >
                    Войти или зарегистрироваться
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForumTopic;
