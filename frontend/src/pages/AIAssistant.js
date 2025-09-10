import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { Bot, User, Send, Lightbulb, TrendingUp, MapPin, Fish, Waves, Sparkles, Clock } from 'lucide-react';
import { aiConversations } from '../data/mockData';
import { toast } from '../hooks/use-toast';

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
    // Find a matching conversation from mock data or generate a response
    const mockResponse = aiConversations.find(conv => 
      conv.user_query.toLowerCase().includes(userQuery.toLowerCase().split(' ')[0])
    );

    if (mockResponse) {
      return {
        response: mockResponse.ai_response,
        followUp: mockResponse.follow_up_questions
      };
    }

    // Default response for unmatched queries
    return {
      response: `I understand you're asking about "${userQuery}". Based on our marine intelligence platform, I can help you analyze:\n\n• Ocean temperature and salinity trends\n• Fish stock predictions and sustainability metrics\n• Biodiversity patterns and species distribution\n• Best fishing zones and recommendations\n• Climate change impacts on marine ecosystems\n\nWould you like me to provide specific data or analysis on any of these topics?`,
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

    // Simulate AI thinking time
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Marine Intelligence Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Ask natural language questions about ocean health, fisheries, and biodiversity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>Quick Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickQuestions.map((question, index) => {
                    const Icon = question.icon;
                    return (
                      <div key={index}>
                        <Badge variant="outline" className="mb-2">
                          {question.category}
                        </Badge>
                        <Button
                          variant="ghost"
                          className="w-full text-left h-auto p-3 justify-start"
                          onClick={() => handleQuickQuestion(question.text)}
                        >
                          <Icon className="h-4 w-4 mr-2 shrink-0" />
                          <span className="text-sm">{question.text}</span>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Assistant Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-blue-500 mt-0.5" />
                    <span>Real-time data analysis and insights</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-blue-500 mt-0.5" />
                    <span>Predictive modeling for climate scenarios</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-blue-500 mt-0.5" />
                    <span>Species identification and classification</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-blue-500 mt-0.5" />
                    <span>Fishing zone recommendations</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-blue-500 mt-0.5" />
                    <span>Policy impact assessment</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <span>Marine AI Assistant</span>
                  <Badge variant="secondary" className="ml-auto">
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages Area */}
                <ScrollArea className="flex-1 px-6">
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <Bot className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Welcome to Marine AI Assistant
                      </h3>
                      <p className="text-gray-500 mb-4">
                        I'm here to help you with marine data analysis, species identification, and ocean insights.
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Try asking: "What's the current status of tuna populations?"
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 py-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex items-start space-x-3 ${
                          message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}>
                            {message.type === 'user' ? 
                              <User className="h-4 w-4" /> : 
                              <Bot className="h-4 w-4" />
                            }
                          </div>
                          
                          <div className={`flex-1 max-w-3xl ${
                            message.type === 'user' ? 'text-right' : ''
                          }`}>
                            <div className={`inline-block p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                            }`}>
                              <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                            
                            <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                              message.type === 'user' ? 'justify-end' : ''
                            }`}>
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTimestamp(message.timestamp)}
                            </div>

                            {message.followUp && (
                              <div className="mt-3 space-y-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Follow-up questions:
                                </p>
                                {message.followUp.map((question, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="mr-2 mb-2"
                                    onClick={() => handleFollowUp(question)}
                                  >
                                    {question}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                <Separator />

                {/* Input Area */}
                <div className="p-4">
                  <div className="flex space-x-2">
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about marine data, species, fishing zones, or climate impact..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!inputMessage.trim() || isTyping}
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Press Enter to send • The AI has access to real-time marine data and research
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;