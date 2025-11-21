import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, 
  Calendar, 
  User, 
  MapPin, 
  Clock,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Download,
  Share2
} from "lucide-react";
import DashboardNav from "@/components/DashboardNav";
import Footer from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Context";
import { cn } from "@/lib/utils";

interface NFTMetadata {
  id: string;
  tokenId: number;
  name: string;
  description: string;
  image: string;
  sessionDate: Date;
  silverName: string;
  activity: string;
  location: string;
  duration: number;
  category: "companionship" | "practical" | "digital";
  impact: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

const impactCategories = {
  companionship: {
    name: "Compañía y Conexión",
    color: "from-blue-400 to-cyan-500",
    icon: "💙",
    examples: [
      "Conversación y escucha activa",
      "Paseo por el parque",
      "Acompañamiento para reducir soledad",
      "Actividades recreativas",
      "Juegos de mesa y entretenimiento"
    ]
  },
  practical: {
    name: "Ayuda Práctica",
    color: "from-green-400 to-emerald-500",
    icon: "🤝",
    examples: [
      "Acompañamiento a cita médica",
      "Compras en supermercado",
      "Trámites bancarios",
      "Gestión de medicamentos",
      "Acompañamiento a terapias"
    ]
  },
  digital: {
    name: "Apoyo Digital",
    color: "from-purple-400 to-violet-500",
    icon: "💻",
    examples: [
      "Ayuda con telemedicina",
      "Configuración de aplicaciones",
      "Videollamadas con familia",
      "Uso de dispositivos móviles",
      "Servicios digitales y banca online"
    ]
  }
};

const AcompananteNFTs = () => {
  const { isConnected, isCompanion, disconnectWallet } = useWeb3();
  const navigate = useNavigate();
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFTMetadata | null>(null);
  const [filter, setFilter] = useState<"all" | "companionship" | "practical" | "digital">("all");

  const handleLogout = () => {
    disconnectWallet();
    navigate("/");
  };

  useEffect(() => {
    if (!isConnected || !isCompanion) {
      navigate("/acompanante/login");
      return;
    }

    // Generate demo NFTs with real impact examples
    const demoNFTs: NFTMetadata[] = [
      {
        id: "1",
        tokenId: 1001,
        name: "Conversación y Escucha Activa",
        description: "Sesión dedicada a reducir la soledad mediante conversación significativa y compañía.",
        image: impactCategories.companionship.color,
        sessionDate: new Date("2024-01-15"),
        silverName: "María González",
        activity: "Conversación y escucha activa",
        location: "Bogotá, Colombia",
        duration: 2,
        category: "companionship",
        impact: "Reducción de sentimiento de soledad y mejora del bienestar emocional",
        attributes: [
          { trait_type: "Categoría", value: "Compañía y Conexión" },
          { trait_type: "Actividad", value: "Conversación y escucha activa" },
          { trait_type: "Duración", value: "2 horas" },
          { trait_type: "Impacto", value: "Bienestar emocional" },
        ],
      },
      {
        id: "2",
        tokenId: 1002,
        name: "Acompañamiento a Cita Médica",
        description: "Apoyo práctico en consulta médica, ayudando con transporte y comprensión de indicaciones.",
        image: impactCategories.practical.color,
        sessionDate: new Date("2024-01-18"),
        silverName: "Carlos Ramírez",
        activity: "Acompañamiento a cita médica",
        location: "Hospital San José, Bogotá",
        duration: 3,
        category: "practical",
        impact: "Acceso efectivo a servicios de salud y seguimiento médico adecuado",
        attributes: [
          { trait_type: "Categoría", value: "Ayuda Práctica" },
          { trait_type: "Actividad", value: "Acompañamiento a cita médica" },
          { trait_type: "Duración", value: "3 horas" },
          { trait_type: "Impacto", value: "Acceso a salud" },
        ],
      },
      {
        id: "3",
        tokenId: 1003,
        name: "Ayuda con Telemedicina",
        description: "Apoyo digital para conectarse con doctor vía videollamada y entender plataforma médica.",
        image: impactCategories.digital.color,
        sessionDate: new Date("2024-01-20"),
        silverName: "Ana López",
        activity: "Ayuda con telemedicina",
        location: "Domicilio, Bogotá",
        duration: 1.5,
        category: "digital",
        impact: "Inclusión digital y acceso a servicios médicos remotos",
        attributes: [
          { trait_type: "Categoría", value: "Apoyo Digital" },
          { trait_type: "Actividad", value: "Ayuda con telemedicina" },
          { trait_type: "Duración", value: "1.5 horas" },
          { trait_type: "Impacto", value: "Inclusión digital" },
        ],
      },
      {
        id: "4",
        tokenId: 1004,
        name: "Compras en Supermercado",
        description: "Ayuda práctica con compras semanales, asegurando nutrición adecuada y autonomía.",
        image: impactCategories.practical.color,
        sessionDate: new Date("2024-01-22"),
        silverName: "Roberto Silva",
        activity: "Compras en supermercado",
        location: "Éxito Calle 80, Bogotá",
        duration: 2,
        category: "practical",
        impact: "Autonomía en necesidades básicas y nutrición adecuada",
        attributes: [
          { trait_type: "Categoría", value: "Ayuda Práctica" },
          { trait_type: "Actividad", value: "Compras en supermercado" },
          { trait_type: "Duración", value: "2 horas" },
          { trait_type: "Impacto", value: "Autonomía" },
        ],
      },
      {
        id: "5",
        tokenId: 1005,
        name: "Videollamada con Familia",
        description: "Configuración y ayuda para conectarse con familiares que viven lejos mediante videollamada.",
        image: impactCategories.digital.color,
        sessionDate: new Date("2024-01-25"),
        silverName: "Patricia Jiménez",
        activity: "Videollamadas con familia",
        location: "Domicilio, Bogotá",
        duration: 1,
        category: "digital",
        impact: "Conexión familiar y reducción de aislamiento",
        attributes: [
          { trait_type: "Categoría", value: "Apoyo Digital" },
          { trait_type: "Actividad", value: "Videollamadas con familia" },
          { trait_type: "Duración", value: "1 hora" },
          { trait_type: "Impacto", value: "Conexión familiar" },
        ],
      },
      {
        id: "6",
        tokenId: 1006,
        name: "Paseo por el Parque",
        description: "Acompañamiento recreativo para actividad física y disfrute del aire libre.",
        image: impactCategories.companionship.color,
        sessionDate: new Date("2024-01-28"),
        silverName: "Luis Martínez",
        activity: "Paseo por el parque",
        location: "Parque Simón Bolívar, Bogotá",
        duration: 1.5,
        category: "companionship",
        impact: "Actividad física y bienestar mental",
        attributes: [
          { trait_type: "Categoría", value: "Compañía y Conexión" },
          { trait_type: "Actividad", value: "Paseo por el parque" },
          { trait_type: "Duración", value: "1.5 horas" },
          { trait_type: "Impacto", value: "Actividad física" },
        ],
      },
    ];

    setNfts(demoNFTs);
  }, [isConnected, isCompanion, navigate]);

  const filteredNFTs = filter === "all" 
    ? nfts 
    : nfts.filter(nft => nft.category === filter);

  const stats = {
    total: nfts.length,
    companionship: nfts.filter(n => n.category === "companionship").length,
    practical: nfts.filter(n => n.category === "practical").length,
    digital: nfts.filter(n => n.category === "digital").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav onLogout={handleLogout} />
      
      <div className="pt-16">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <div className="container mx-auto px-4 py-8">
            <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-glow-primary">
              <Award className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Mi Colección de NFTs
              </h1>
              <p className="text-muted-foreground">
                Certificados inmutables de tu trabajo como acompañante
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <Card className="glass-effect">
              <CardContent className="p-4 text-center">
                <p className="text-3xl mb-1">🏆</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total de Impactos</p>
              </CardContent>
            </Card>
            <Card className="glass-effect border-blue-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-3xl mb-1">{impactCategories.companionship.icon}</p>
                <p className="text-2xl font-bold text-blue-500">{stats.companionship}</p>
                <p className="text-xs text-muted-foreground">Compañía</p>
              </CardContent>
            </Card>
            <Card className="glass-effect border-green-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-3xl mb-1">{impactCategories.practical.icon}</p>
                <p className="text-2xl font-bold text-green-500">{stats.practical}</p>
                <p className="text-xs text-muted-foreground">Ayuda Práctica</p>
              </CardContent>
            </Card>
            <Card className="glass-effect border-purple-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-3xl mb-1">{impactCategories.digital.icon}</p>
                <p className="text-2xl font-bold text-purple-500">{stats.digital}</p>
                <p className="text-xs text-muted-foreground">Apoyo Digital</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={(v) => setFilter(v as any)}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="companionship">💙 Compañía</TabsTrigger>
            <TabsTrigger value="practical">🤝 Práctica</TabsTrigger>
            <TabsTrigger value="digital">💻 Digital</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredNFTs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Award className="w-16 h-16 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              {filter === "all" ? "No tienes NFTs aún" : `No tienes NFTs de ${
                filter === "companionship" ? "Compañía" :
                filter === "practical" ? "Ayuda Práctica" : "Apoyo Digital"
              }`}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Completa sesiones de acompañamiento para ganar NFTs que certifican tu trabajo
            </p>
            <Button onClick={() => navigate("/acompanante/scan")} className="shadow-glow-primary">
              Registrar primera sesión
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNFTs.map((nft, index) => (
              <Card
                key={nft.id}
                className={cn(
                  "glass-effect hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in hover-scale",
                  selectedNFT?.id === nft.id && "ring-2 ring-primary"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedNFT(nft)}
              >
                <CardContent className="p-0">
                  {/* NFT Image */}
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      nft.image,
                      "flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                    )}>
                      <div className="text-center text-white p-6">
                        <div className="text-6xl mb-4">
                          {impactCategories[nft.category].icon}
                        </div>
                        <Award className="w-16 h-16 mb-3 mx-auto" />
                        <p className="text-3xl font-bold mb-2">#{nft.tokenId}</p>
                        <p className="text-sm opacity-90 px-4 line-clamp-2">{nft.activity}</p>
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <Badge 
                      className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm border-white/30"
                    >
                      {impactCategories[nft.category].name}
                    </Badge>

                    {/* Sparkle Effect */}
                    <Sparkles className="absolute top-3 left-3 w-6 h-6 text-white/80 animate-pulse" />
                  </div>

                  {/* NFT Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{nft.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{nft.description}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{nft.silverName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{format(nft.sessionDate, "d MMM yyyy", { locale: es })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{nft.duration}h de compañía</span>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNFT(nft);
                      }}
                    >
                      Ver detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* NFT Details Modal/Card */}
        {selectedNFT && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedNFT(null)}
          >
            <Card 
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-effect animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-secondary rounded-xl flex items-center justify-center">
                      <Award className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{selectedNFT.name}</CardTitle>
                      <CardDescription className="mt-1">Token ID: #{selectedNFT.tokenId}</CardDescription>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSelectedNFT(null)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* NFT Preview */}
                  <div>
                    <div className={cn(
                      "aspect-square rounded-xl bg-gradient-to-br",
                      selectedNFT.image,
                      "flex items-center justify-center mb-4"
                    )}>
                      <div className="text-center text-white p-8">
                        <div className="text-8xl mb-6">
                          {impactCategories[selectedNFT.category].icon}
                        </div>
                        <Award className="w-32 h-32 mb-6 mx-auto" />
                        <p className="text-6xl font-bold mb-4">#{selectedNFT.tokenId}</p>
                        <p className="text-2xl px-4 mb-4">{selectedNFT.activity}</p>
                        <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white text-sm px-4 py-1">
                          {impactCategories[selectedNFT.category].name}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartir
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>

                  {/* NFT Metadata */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Descripción</h3>
                      <p className="text-muted-foreground mb-4">{selectedNFT.description}</p>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <p className="text-sm font-semibold mb-1">💫 Impacto generado:</p>
                        <p className="text-sm text-muted-foreground">{selectedNFT.impact}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Detalles de la Sesión</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <User className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Adulto Mayor</p>
                            <p className="text-sm text-muted-foreground">{selectedNFT.silverName}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <Calendar className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Fecha</p>
                            <p className="text-sm text-muted-foreground">
                              {format(selectedNFT.sessionDate, "d 'de' MMMM, yyyy", { locale: es })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <Clock className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Duración</p>
                            <p className="text-sm text-muted-foreground">{selectedNFT.duration} horas</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <MapPin className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Ubicación</p>
                            <p className="text-sm text-muted-foreground">{selectedNFT.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Atributos</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedNFT.attributes.map((attr, index) => (
                          <div 
                            key={index}
                            className="p-3 bg-muted/50 rounded-lg text-center"
                          >
                            <p className="text-xs text-muted-foreground mb-1">{attr.trait_type}</p>
                            <p className="text-sm font-semibold">{attr.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        <span>Certificado en blockchain inmutable</span>
                      </div>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="mt-2 p-0 h-auto text-primary"
                      >
                        Ver en explorador de blockchain
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AcompananteNFTs;
