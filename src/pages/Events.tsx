
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Кибернетический конгресс",
      description: "Ежегодная встреча киберэнтузиастов и разработчиков с обсуждением новейших тенденций",
      date: "2025-06-15",
      time: "12:00",
      location: "Виртуальная реальность, Сектор A-7",
      attendees: 243,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Хакатон по ИИ",
      description: "48-часовой марафон по созданию инновационных решений с использованием искусственного интеллекта",
      date: "2025-07-22",
      time: "10:00",
      location: "Онлайн",
      attendees: 178,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Стрим разработки PRISM",
      description: "Прямая трансляция процесса разработки новых функций платформы",
      date: "2025-05-30",
      time: "20:00",
      location: "Twitch и YouTube",
      attendees: 512,
      image: "/placeholder.svg"
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Введение в квантовые вычисления",
      date: "2025-04-10",
      attendees: 156
    },
    {
      id: 5,
      title: "Мастер-класс по нейронным сетям",
      date: "2025-03-22",
      attendees: 203
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-prism-dark text-white">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-prism-accent to-prism-accent-2 text-transparent bg-clip-text">
              ИВЕНТЫ
            </span>
          </h1>
          
          <div className="relative mb-12">
            <h2 className="text-2xl font-bold mb-6">Предстоящие события</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-black/30 backdrop-blur-sm border-prism-muted/30 overflow-hidden">
                  <div className="h-40 bg-prism-muted/20 flex items-center justify-center">
                    <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-300">
                        <Calendar size={16} className="mr-2 text-prism-accent" />
                        {new Date(event.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Clock size={16} className="mr-2 text-prism-accent" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <MapPin size={16} className="mr-2 text-prism-accent" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Users size={16} className="mr-2 text-prism-accent" />
                        {event.attendees} участников
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full bg-gradient-to-r from-prism-accent to-prism-accent-2">
                      Зарегистрироваться
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <h2 className="text-2xl font-bold mb-6">Прошедшие события</h2>
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <div 
                  key={event.id}
                  className="border border-prism-muted/30 rounded-lg p-4 flex justify-between items-center bg-black/20"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-200">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <Calendar size={14} className="mr-2" />
                      {new Date(event.date).toLocaleDateString('ru-RU')}
                      <span className="mx-3">•</span>
                      <Users size={14} className="mr-2" />
                      {event.attendees} участников
                    </div>
                  </div>
                  <Badge variant="outline" className="border-prism-accent/50 text-prism-accent">
                    Архив
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
