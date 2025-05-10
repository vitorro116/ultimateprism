
import React from 'react';

const TeamSection = () => {
  const team = [
    {
      name: "Владислав Игоревич Титов",
      alias: "Quazylix",
      role: "Технический директор / CTO",
      image: "/team/titov.jpg",
      description: "Специалист по архитектуре распределенных систем и квантовым вычислениям. Руководит разработкой основной технологической платформы PRISM."
    },
    {
      name: "Константин Кириллович Токц",
      alias: "Pechenie",
      role: "Руководитель лаборатории / Research Lead",
      image: "/team/tokc.jpg",
      description: "Ведущий исследователь в области искусственного интеллекта и нейронных сетей. Координирует все экспериментальные проекты PRISM."
    },
    {
      name: "Алексей Владимирович Зайцев",
      alias: "Bowser",
      role: "Директор по безопасности / CSO",
      image: "/team/zaytsev.jpg",
      description: "Эксперт по кибербезопасности и криптографии. Отвечает за защиту данных и безопасность коммуникаций в сообществе PRISM."
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">КОМАНДА</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              <div className="relative border border-prism-muted/30 rounded-xl p-6 bg-prism-dark/50 backdrop-blur-sm hover:border-prism-accent/50 transition-all duration-300 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-prism-accent/30 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-prism-muted/30 flex items-center justify-center">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <h3 className="font-bold text-white text-lg mb-1">{member.alias}</h3>
                <p className="text-gray-400 text-xs mb-2">{member.name}</p>
                <p className="text-prism-accent text-sm mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm italic">{member.description}</p>
              </div>
              
              <div className="absolute -inset-0.5 bg-gradient-to-r from-prism-accent to-prism-accent-2 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity blur-sm"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 max-w-2xl mx-auto">
            Наша команда состоит из ведущих специалистов в различных областях информационных технологий, объединенных общей целью - создать передовую технологическую платформу для развития киберпространства будущего.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
