
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Users, ArrowRight } from 'lucide-react';

const Forum = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('forum_categories')
          .select('*')
          .order('order_index', { ascending: true });
          
        if (error) {
          throw error;
        }
        
        setCategories(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Ошибка при загрузке категорий:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-prism-dark flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Форум</h1>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse text-prism-accent">Загрузка...</div>
            </div>
          ) : error ? (
            <Card className="bg-red-900/20 border-red-500/50 mb-8">
              <CardContent className="pt-6">
                <p className="text-red-300">{error}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <Link to={`/forum/category/${category.id}`} key={category.id}>
                  <Card className="bg-black/30 backdrop-blur-md border-prism-muted/30 hover:border-prism-accent/50 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-white group-hover:text-prism-accent-2">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-400 space-x-4">
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span>0 тем</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>0 участников</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-prism-accent/70" />
                    </CardContent>
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

export default Forum;
