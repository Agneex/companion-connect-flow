import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
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
import Navigation from "@/components/Navigation";
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
  rarity: "common" | "rare" | "epic" | "legendary";
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

const AcompananteNFTs = () => {
  const { isConnected, isCompanion, account } = useWeb3();
  const navigate = useNavigate();
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFTMetadata | null>(null);
  const [filter, setFilter] = useState<"all" | "common" | "rare" | "epic" | "legendary">("all");

  useEffect(() => {
    if (!isConnected || !isCompanion) {
      navigate("/acompanante/login");
      return;
    }

    // Generate NFTs based on completed sessions
    const sessions = JSON.parse(localStorage.getItem("companion_sessions") || "[]");
    
    const generatedNFTs: NFTMetadata[] = sessions.map((session: any, index: number) => {
      // Determine rarity based on duration and type
      let rarity: "common" | "rare" | "epic" | "legendary" = "common";
      if (session.duration >= 3) rarity = "rare";
      if (session.activity.includes("médica") || session.activity.includes("hospital")) rarity = "epic";
      if (session.duration >= 4) rarity = "legendary";

      return {
        id: session.id,
        tokenId: 1000 + index,
        name: `Sesión de Acompañamiento #${1000 + index}`,
        description: `NFT que certifica una sesión de acompañamiento realizada el ${format(new Date(session.date), "d 'de' MMMM, yyyy", { locale: es })}`,
        image: generateNFTImage(rarity),
        sessionDate: new Date(session.date),
        silverName: session.silverName,
        activity: session.activity,
        location: "Bogotá, Colombia",
        duration: session.duration,
        rarity,
        attributes: [
          { trait_type: "Actividad", value: session.activity },
          { trait_type: "Duración", value: `${session.duration} horas` },
          { trait_type: "Adulto Mayor", value: session.silverName },
          { trait_type: "Rareza", value: rarity.charAt(0).toUpperCase() + rarity.slice(1) },
          { trait_type: "Fecha", value: format(new Date(session.date), "MMMM yyyy", { locale: es }) },
        ],
      };
    });

    setNfts(generatedNFTs);
  }, [isConnected, isCompanion, navigate]);

  const generateNFTImage = (rarity: string) => {
    // In production, these would be actual IPFS links or generated images
    const colors = {
      common: "from-blue-400 to-blue-600",
      rare: "from-purple-400 to-purple-600",
      epic: "from-pink-400 to-pink-600",
      legendary: "from-yellow-400 to-orange-600",
    };
    return colors[rarity as keyof typeof colors];
  };

  const getRarityBadgeColor = (rarity: string) => {
    const colors = {
      common: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      rare: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      epic: "bg-pink-500/10 text-pink-500 border-pink-500/20",
      legendary: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    };
    return colors[rarity as keyof typeof colors];
  };

  const getRarityIcon = (rarity: string) => {
    const icons = {
      common: "✦",
      rare: "✦✦",
      epic: "✦✦✦",
      legendary: "★★★",
    };
    return icons[rarity as keyof typeof icons];
  };

  const filteredNFTs = filter === "all" 
    ? nfts 
    : nfts.filter(nft => nft.rarity === filter);

  const stats = {
    total: nfts.length,
    common: nfts.filter(n => n.rarity === "common").length,
    rare: nfts.filter(n => n.rarity === "rare").length,
    epic: nfts.filter(n => n.rarity === "epic").length,
    legendary: nfts.filter(n => n.rarity === "legendary").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/acompanante/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al dashboard
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
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
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
            <Card className="glass-effect">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total NFTs</p>
              </CardContent>
            </Card>
            <Card className="glass-effect border-blue-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-500">{stats.common}</p>
                <p className="text-xs text-muted-foreground">Común ✦</p>
              </CardContent>
            </Card>
            <Card className="glass-effect border-purple-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-purple-500">{stats.rare}</p>
                <p className="text-xs text-muted-foreground">Raro ✦✦</p>
              </CardContent>
            </Card>
            <Card className="glass-effect border-pink-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-pink-500">{stats.epic}</p>
                <p className="text-xs text-muted-foreground">Épico ✦✦✦</p>
              </CardContent>
            </Card>
            <Card className="glass-effect border-yellow-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-yellow-500">{stats.legendary}</p>
                <p className="text-xs text-muted-foreground">Legendario ★★★</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={(v) => setFilter(v as any)}>
          <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="common">Común</TabsTrigger>
            <TabsTrigger value="rare">Raro</TabsTrigger>
            <TabsTrigger value="epic">Épico</TabsTrigger>
            <TabsTrigger value="legendary">Legendario</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredNFTs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Award className="w-16 h-16 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              {filter === "all" ? "No tienes NFTs aún" : `No tienes NFTs ${filter}`}
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
                      <div className="text-center text-white">
                        <Award className="w-20 h-20 mb-4 mx-auto animate-pulse" />
                        <p className="text-4xl font-bold mb-2">#{nft.tokenId}</p>
                        <p className="text-sm opacity-90 px-4">{nft.activity}</p>
                      </div>
                    </div>
                    
                    {/* Rarity Badge */}
                    <Badge 
                      className={cn(
                        "absolute top-3 right-3",
                        getRarityBadgeColor(nft.rarity)
                      )}
                    >
                      {getRarityIcon(nft.rarity)} {nft.rarity.charAt(0).toUpperCase() + nft.rarity.slice(1)}
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
                      <div className="text-center text-white">
                        <Award className="w-32 h-32 mb-4 mx-auto" />
                        <p className="text-6xl font-bold mb-4">#{selectedNFT.tokenId}</p>
                        <p className="text-xl px-4">{selectedNFT.activity}</p>
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
                      <p className="text-muted-foreground">{selectedNFT.description}</p>
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

      <Footer />
    </div>
  );
};

export default AcompananteNFTs;
