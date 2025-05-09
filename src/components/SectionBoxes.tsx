
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Calendar, Laugh, FlaskConical, Archive, Grid2X2, Users } from 'lucide-react';

const SectionBoxes = () => {
  const sections = [
    {
      title: "ФОРУМ",
      description: "Как 4chan, но умный",
      icon: <MessageSquare className="text-prism-accent" />,
      link: "/forum",
      color: "from-prism-accent/20 to-prism-accent/5"
    },
    {
      title: "ИВЕНТЫ",
      description: "Челленджи, стримы",
      icon: <Calendar className="text-prism-accent-2" />,
      link: "/events",
      color: "from-prism-accent-2/20 to-prism-accent-2/5"
    },
    {
      title: "МЕМЫ",
      description: "Приколы, генератор",
      icon: <Laugh className="text-prism-accent-red" />,
      link: "/memes",
      color: "from-prism-accent-red/20 to-prism-accent-red/5"
    },
    {
      title: "ЛАБОРАТОРИЯ",
      description: "Безумные эксперименты",
      icon: <FlaskConical className="text-purple-400" />,
      link: "/lab",
      color: "from-purple-400/20 to-purple-400/5"
    },
    {
      title: "АРХИВ",
      description: "Хранилище всего",
      icon: <Archive className="text-amber-400" />,
      link: "/vault",
      color: "from-amber-400/20 to-amber-400/5"
    },
    {
      title: "ПИКСЕЛИ",
      description: "Пиксельная война",
      icon: <Grid2X2 className="text-emerald-400" />,
      link: "/pixels",
      color: "from-emerald-400/20 to-emerald-400/5"
    },
    {
      title: "ПРИСОЕДИНИТЬСЯ",
      description: "Стать частью комьюнити",
      icon: <Users className="text-blue-400" />,
      link: "/join",
      color: "from-blue-400/20 to-blue-400/5"
    }
  ];

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">ЭКОСИСТЕМА</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <Link 
              to={section.link} 
              key={index}
              className="group relative"
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
              <div className="relative border border-prism-muted/30 rounded-xl p-6 h-full bg-prism-dark/50 backdrop-blur-sm hover:border-prism-accent/50 transition-all duration-300 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-prism-muted/20 mr-3">
                    {section.icon}
                  </div>
                  <h3 className="font-bold text-white">{section.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{section.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionBoxes;
