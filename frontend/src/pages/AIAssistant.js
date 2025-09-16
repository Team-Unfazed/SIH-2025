
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { Bot, User, Send, Lightbulb, TrendingUp, MapPin, Fish, Waves, Sparkles, Clock } from 'lucide-react';
import { aiConversations } from '../data/mockData';
import { toast } from '../hooks/use-toast';
import { motion } from 'framer-motion';

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickQuestions = [
    {
      icon: TrendingUp,
      text: "Show biodiversity trends in Bay of Bengal since 2020",
      category: "Biodiversity"
    },
    {
      icon: Fish,
      text: "Predict tuna stocks in 2035 if ocean warms by 2°C",
      category: "Climate Impact"
    },
    {
      icon: MapPin,
      text: "What are the best fishing zones for this week?",
      category: "Fishing"
    },
    {
      icon: Waves,
      text: "Analyze water quality changes in Arabian Sea",
      category: "Ocean Health"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userQuery) => {
    const mockResponse = aiConversations.find(conv => 
      conv.user_query.toLowerCase().includes(userQuery.toLowerCase().split(' ')[0])
    );

    if (mockResponse) {
      return {
        response: mockResponse.ai_response,
        followUp: mockResponse.follow_up_questions
      };
    }

    return {
      response: `I understand you're asking about "${userQuery}". Based on our marine intelligence platform, I can help you analyze:

• Ocean temperature and salinity trends
• Fish stock predictions and sustainability metrics
• Biodiversity patterns and species distribution
• Best fishing zones and recommendations
• Climate change impacts on marine ecosystems

Would you like me to provide specific data or analysis on any of these topics?`,
      followUp: [
        "Show me the latest ocean temperature data",
        "What species are most at risk?",
        "Provide fishing recommendations for today"
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = simulateAIResponse(inputMessage);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.response,
        followUp: aiResponse.followUp,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const handleFollowUp = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-black dark:to-blue-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            AI Marine Intelligence Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your expert guide to ocean health, fisheries, and biodiversity data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Questions & Capabilities */}
          <motion.div 
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                  <Lightbulb className="h-5 w-5 text-blue-500" />
                  <span>Quick Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickQuestions.map((question, index) => {
                    const Icon = question.icon;
                    return (
                      <motion.div 
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Button
                          variant="ghost"
                          className="w-full text-left h-auto p-3 justify-start hover:bg-blue-100/50 dark:hover:bg-blue-900/30 rounded-lg border border-transparent hover:border-blue-300 dark:hover:border-blue-700"
                          onClick={() => handleQuickQuestion(question.text)}
                        >
                          <Icon className="h-5 w-5 mr-3 text-blue-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{question.text}</span>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 dark:text-gray-200">Assistant Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  {['Real-time data analysis', 'Predictive modeling', 'Species identification', 'Fishing zone recommendations', 'Policy impact assessment'].map((cap, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Sparkles className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Interface */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-[75vh] min-h-[600px] flex flex-col bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <CardHeader className="border-b border-gray-200/50 dark:border-gray-700/50">
                <CardTitle className="flex items-center space-x-3">
                  <Bot className="h-6 w-6 text-blue-500" />
                  <span className="text-gray-800 dark:text-gray-200">Marine AI Assistant</span>
                  <Badge variant="outline" className="ml-auto border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400">
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-6">
                  {messages.length === 0 ? (
                    <div className="text-center py-16 flex flex-col items-center justify-center h-full">
                      <Bot className="h-20 w-20 mx-auto text-gray-400 dark:text-gray-500 mb-6" />
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Welcome to Marine AI
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                        I can help you with marine data analysis, species identification, and ocean insights.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6 py-6">
                      {messages.map((message) => (
                        <motion.div 
                          key={message.id} 
                          className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-sm ${
                            message.type === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}>
                            {message.type === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                          </div>
                          
                          <div className={`flex-1 max-w-xl`}>
                            <div className={`relative inline-block p-4 rounded-2xl shadow-sm ${
                              message.type === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'
                            }`}>
                              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                            </div>
                            
                            <div className={`flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400 ${
                              message.type === 'user' ? 'justify-end' : ''
                            }`}>
                              <Clock className="h-3 w-3 mr-1.5" />
                              {formatTimestamp(message.timestamp)}
                            </div>

                            {message.followUp && (
                              <div className="mt-4 space-y-2">
                                {message.followUp.map((question, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="mr-2 mb-2 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/60 border-gray-300/70 dark:border-gray-600/70"
                                    onClick={() => handleFollowUp(question)}
                                  >
                                    {question}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                      
                      {isTyping && (
                        <motion.div 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-sm">
                            <Bot className="h-5 w-5" />
                          </div>
                          <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-none p-4 shadow-sm">
                            <div className="flex space-x-1.5">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                <Separator className="dark:bg-gray-700/50" />

                <div className="p-4 bg-white/50 dark:bg-gray-900/30">
                  <div className="relative">
                    <Textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      rows={1}
                      placeholder="Ask about marine data, species, or climate impact..."
                      className="flex-1 resize-none leading-6 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-full py-3 px-6 pr-16 focus:ring-2 focus:ring-blue-500"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!inputMessage.trim() || isTyping}
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
