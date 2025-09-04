import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Trophy, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone,
  Target,
  Heart,
  Award
} from "lucide-react";

const teamMembers = [
  {
    name: "Ahmed Benali",
    role: "Chief Sports Editor",
    bio: "Sports journalist with over 15 years of experience covering ASA and Moroccan football.",
    avatar: null,
    expertise: ["Match Analysis", "Player Interviews", "Transfer News"]
  },
  {
    name: "Sara Alami",
    role: "Content Manager",
    bio: "Passionate about storytelling and bringing ASA's stories to life for our global audience.",
    avatar: null,
    expertise: ["Content Strategy", "Social Media", "Fan Engagement"]
  },
  {
    name: "Mohamed Tazi",
    role: "Technical Writer",
    bio: "Former ASA player turned writer, providing insider perspectives on training and tactics.",
    avatar: null,
    expertise: ["Tactical Analysis", "Training Reports", "Youth Development"]
  },
  {
    name: "Fatima Zahra",
    role: "Community Reporter",
    bio: "Covering ASA's community initiatives and the human stories behind the beautiful game.",
    avatar: null,
    expertise: ["Community Stories", "Social Impact", "Fan Features"]
  }
];

const achievements = [
  {
    year: "2024",
    title: "Championship Winners",
    description: "First championship title in over a decade"
  },
  {
    year: "2023",
    title: "Youth Development Award",
    description: "Recognized for outstanding youth academy program"
  },
  {
    year: "2022",
    title: "Community Impact Prize",
    description: "Honored for social initiatives and community engagement"
  }
];

const stats = [
  { label: "Founded", value: "1961", icon: Calendar },
  { label: "Stadium Capacity", value: "45,000", icon: Users },
  { label: "Trophies Won", value: "23", icon: Trophy },
  { label: "Youth Players", value: "200+", icon: Award }
];

export default function BlogAbout() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <img 
            src="/lovable-uploads/b0c00b55-d393-495d-b9e7-ca27a59bd8cf.png" 
            alt="ASA Logo" 
            className="h-16 w-16"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              About ASA Sports
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Astre Sportif D'Agadir
            </p>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Welcome to the official blog of Astre Sportif D'Agadir (ASA), one of Morocco's most 
          prestigious football clubs. Since 1961, we've been more than just a football team – 
          we're a symbol of pride, passion, and community spirit in Agadir and beyond.
        </p>
      </section>

      {/* Stats Section */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Our Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 1961, Astre Sportif D'Agadir has grown from humble beginnings to become 
              one of Morocco's most respected football institutions. Our journey has been marked by 
              dedication, perseverance, and an unwavering commitment to excellence both on and off the pitch.
            </p>
            <p>
              Based in the beautiful coastal city of Agadir, we represent not just a football club, 
              but the hopes and dreams of our community. Our players, staff, and supporters form a 
              family united by passion for the beautiful game and pride in our Amazigh heritage.
            </p>
            <p>
              Today, ASA continues to build on its rich legacy while looking toward the future. 
              Our state-of-the-art youth academy, community programs, and commitment to developing 
              local talent ensure that the ASA story will continue for generations to come.
            </p>
          </div>
        </div>
        
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg"
            alt="ASA Team"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Mission & Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Target className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
          <p className="text-muted-foreground">
            To represent Agadir and Morocco with pride, developing world-class football talent 
            while strengthening our community through sport and social responsibility.
          </p>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Heart className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">Our Values</h3>
          <p className="text-muted-foreground">
            Integrity, respect, teamwork, and excellence guide everything we do. We believe in 
            fair play, community engagement, and nurturing talent at every level.
          </p>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <Award className="h-8 w-8 text-success" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">Our Vision</h3>
          <p className="text-muted-foreground">
            To be recognized as Morocco's premier football club, competing at the highest levels 
            while remaining deeply connected to our roots and community.
          </p>
        </Card>
      </section>

      {/* Recent Achievements */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground text-center">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <Card key={achievement.year} className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Badge className="bg-primary text-primary-foreground">
                  {achievement.year}
                </Badge>
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {achievement.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {achievement.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Meet Our Editorial Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate journalists and writers who bring you the latest ASA news, 
            analysis, and stories from behind the scenes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.name} className="p-6 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-primary mb-3">{member.role}</p>
              <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-foreground">Expertise:</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Information */}
      <section>
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Get in Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a story tip, feedback, or want to collaborate? We'd love to hear from you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">Agadir, Morocco</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">blog@asa-sports.com</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">+212 123 456 789</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <Button size="lg">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}