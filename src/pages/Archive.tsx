
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Archive as ArchiveIcon, FileText, FileImage, File, Search, Filter, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const ArchivePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fileType, setFileType] = useState('all');
  
  const archiveFiles = [
    {
      id: 1,
      name: "Технические спецификации PRISM v1.0",
      type: "document",
      format: "pdf",
      size: "2.8 MB",
      uploaded: "2025-01-15",
      author: "Quazylix"
    },
    {
      id: 2,
      name: "Схема квантового процессора",
      type: "image",
      format: "png",
      size: "4.2 MB",
      uploaded: "2025-02-03",
      author: "Bowser"
    },
    {
      id: 3,
      name: "Архитектура нейроинтерфейса",
      type: "document",
      format: "docx",
      size: "1.5 MB",
      uploaded: "2025-02-18",
      author: "Pechenie"
    },
    {
      id: 4,
      name: "Данные экспериментов серии X-7",
      type: "data",
      format: "csv",
      size: "8.7 MB",
      uploaded: "2025-03-05",
      author: "Admin"
    },
    {
      id: 5,
      name: "Результаты симуляции временных линий",
      type: "data",
      format: "json",
      size: "3.1 MB",
      uploaded: "2025-03-22",
      author: "Quazylix"
    },
    {
      id: 6,
      name: "Прототип ядра с переменной гравитацией",
      type: "image",
      format: "jpg",
      size: "5.9 MB",
      uploaded: "2025-04-10",
      author: "Bowser"
    }
  ];

  // Фильтрация файлов по типу и поисковому запросу
  const filteredFiles = archiveFiles.filter(file => {
    const matchesType = fileType === 'all' || file.type === fileType;
    const matchesQuery = file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         file.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  // Функция для получения иконки файла
  const getFileIcon = (type) => {
    switch (type) {
      case 'document':
        return <FileText size={16} className="text-blue-400" />;
      case 'image':
        return <FileImage size={16} className="text-green-400" />;
      default:
        return <File size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-prism-dark text-white">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-prism-accent to-amber-400 text-transparent bg-clip-text">
              АРХИВ
            </span>
          </h1>
          
          <Card className="bg-black/30 backdrop-blur-sm border-prism-muted/30 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <div className="relative flex-grow mb-4 md:mb-0">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Поиск файлов..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-black/30 border-prism-muted/30 text-white placeholder:text-gray-500"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter size={16} className="text-gray-400" />
                  <Select value={fileType} onValueChange={setFileType}>
                    <SelectTrigger className="w-[180px] bg-black/30 border-prism-muted/30">
                      <SelectValue placeholder="Тип файла" />
                    </SelectTrigger>
                    <SelectContent className="bg-prism-dark border-prism-muted/30">
                      <SelectItem value="all">Все типы</SelectItem>
                      <SelectItem value="document">Документы</SelectItem>
                      <SelectItem value="image">Изображения</SelectItem>
                      <SelectItem value="data">Данные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-black/30 backdrop-blur-sm border border-prism-muted/30 rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-black/40 border-prism-muted/30">
                  <TableHead className="text-gray-400 w-[40%]">Название</TableHead>
                  <TableHead className="text-gray-400">Формат</TableHead>
                  <TableHead className="text-gray-400">Размер</TableHead>
                  <TableHead className="text-gray-400">Дата</TableHead>
                  <TableHead className="text-gray-400">Автор</TableHead>
                  <TableHead className="text-gray-400 text-right">Действие</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.length > 0 ? (
                  filteredFiles.map((file) => (
                    <TableRow key={file.id} className="hover:bg-black/40 border-prism-muted/30">
                      <TableCell className="font-medium text-white">
                        <div className="flex items-center">
                          {getFileIcon(file.type)}
                          <span className="ml-2">{file.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-black/30 text-gray-300 border-prism-muted/50">
                          {file.format}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{file.size}</TableCell>
                      <TableCell className="text-gray-300">
                        {new Date(file.uploaded).toLocaleDateString('ru-RU')}
                      </TableCell>
                      <TableCell className="text-gray-300">{file.author}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-prism-accent hover:text-prism-accent hover:bg-prism-accent/10">
                          <Download size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                      <ArchiveIcon size={32} className="mx-auto mb-2 opacity-50" />
                      <p>Файлы не найдены</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArchivePage;
