
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Star, Heart, Shield, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-prism-dark text-white">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-prism-accent to-blue-400 text-transparent bg-clip-text">
                ПРИСОЕДИНЯЙТЕСЬ К НАМ
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Станьте частью Ultimate Prism — универсальной среды всего.
              Создавайте, исследуйте и взаимодействуйте с другими пользователями.
            </p>
            
            {!user ? (
              <Button 
                onClick={() => navigate('/auth')} 
                size="lg" 
                className="bg-gradient-to-r from-prism-accent to-blue-400"
              >
                Создать аккаунт <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Card className="bg-prism-accent/10 border border-prism-accent/30 p-6">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold mb-2">Приветствуем, {profile?.username || 'Пользователь'}!</h3>
                  <p className="text-gray-300 mb-4">
                    Вы уже являетесь частью нашего сообщества. Исследуйте доступные разделы и принимайте участие в жизни проекта.
                  </p>
                  <Button 
                    onClick={() => navigate('/forum')} 
                    className="bg-prism-accent"
                  >
                    Перейти на форум <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="p-6 bg-black/30 backdrop-blur-sm border border-prism-muted/30 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Что вы получаете</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-4 p-2 rounded-full bg-prism-accent/10">
                    <Star className="h-5 w-5 text-prism-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Доступ к эксклюзивному контенту</h3>
                    <p className="text-gray-400 text-sm">
                      Специальные форумы, эксперименты и проекты доступны только для зарегистрированных участников
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 p-2 rounded-full bg-prism-accent/10">
                    <Heart className="h-5 w-5 text-prism-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Сообщество единомышленников</h3>
                    <p className="text-gray-400 text-sm">
                      Общайтесь с теми, кто разделяет ваши интересы и стремления
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 p-2 rounded-full bg-prism-accent/10">
                    <Shield className="h-5 w-5 text-prism-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Защита данных</h3>
                    <p className="text-gray-400 text-sm">
                      Ваши данные надежно защищены современными технологиями шифрования
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 p-2 rounded-full bg-prism-accent/10">
                    <Zap className="h-5 w-5 text-prism-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Участие в развитии проекта</h3>
                    <p className="text-gray-400 text-sm">
                      Ваши идеи и предложения помогают нам создавать лучшую версию Ultimate Prism
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-black/30 backdrop-blur-sm border border-prism-muted/30 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Часто задаваемые вопросы</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-prism-accent mb-1">Что такое Ultimate Prism?</h3>
                  <p className="text-gray-400 text-sm">
                    Ultimate Prism — это универсальная среда для общения, творчества и исследований. Мы объединяем сообщество людей с разными интересами и навыками.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-prism-accent mb-1">Регистрация платная?</h3>
                  <p className="text-gray-400 text-sm">
                    Нет, регистрация и базовые функции платформы абсолютно бесплатны. Некоторые расширенные возможности могут быть доступны за дополнительную плату.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-prism-accent mb-1">Как я могу участвовать в проектах?</h3>
                  <p className="text-gray-400 text-sm">
                    После регистрации вы получаете доступ к форуму, где можете присоединиться к существующим проектам или предложить свои идеи.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-prism-accent mb-1">Как часто выходят обновления?</h3>
                  <p className="text-gray-400 text-sm">
                    Мы постоянно работаем над улучшением платформы и выпускаем обновления каждые 2-3 недели. О крупных обновлениях мы сообщаем заранее.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Готовы начать?</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Присоединяйтесь к тысячам пользователей, которые уже стали частью нашего сообщества и вносят свой вклад в развитие проекта.
            </p>
            
            {!user ? (
              <Button 
                onClick={() => navigate('/auth')} 
                size="lg" 
                className="bg-gradient-to-r from-prism-accent to-blue-400"
              >
                Создать аккаунт <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/profile')} 
                size="lg" 
                className="bg-prism-accent"
              >
                Перейти в профиль <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Join;
