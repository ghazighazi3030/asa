import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Globe, 
  Mail, 
  Shield, 
  Palette, 
  Database,
  Save,
  Upload,
  Download
} from "lucide-react";

const settingsSections = [
  {
    title: "General Settings",
    icon: Globe,
    items: [
      { label: "Site Title", value: "ASA Sports Blog", type: "input" },
      { label: "Site Description", value: "Official blog of Astre Sportif D'Agadir", type: "textarea" },
      { label: "Site URL", value: "https://asa-blog.com", type: "input" },
      { label: "Language", value: "English", type: "select" },
      { label: "Timezone", value: "GMT+1", type: "select" }
    ]
  },
  {
    title: "Email Settings", 
    icon: Mail,
    items: [
      { label: "SMTP Host", value: "smtp.gmail.com", type: "input" },
      { label: "SMTP Port", value: "587", type: "input" },
      { label: "SMTP Username", value: "blog@asa.com", type: "input" },
      { label: "From Name", value: "ASA Blog", type: "input" },
      { label: "Enable Notifications", value: true, type: "toggle" }
    ]
  },
  {
    title: "Security Settings",
    icon: Shield, 
    items: [
      { label: "Two-Factor Authentication", value: false, type: "toggle" },
      { label: "Login Attempts Limit", value: "5", type: "input" },
      { label: "Session Timeout (minutes)", value: "60", type: "input" },
      { label: "Force HTTPS", value: true, type: "toggle" },
      { label: "Enable Password Reset", value: true, type: "toggle" }
    ]
  }
];

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="mt-2 text-muted-foreground">Manage your blog configuration and preferences.</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 hover-lift cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Appearance</h3>
              <p className="text-sm text-muted-foreground">Customize themes and branding</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 hover-lift cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Database className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Backup</h3>
              <p className="text-sm text-muted-foreground">Backup and restore data</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 hover-lift cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Upload className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Import/Export</h3>
              <p className="text-sm text-muted-foreground">Manage data imports and exports</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              </div>
              
              <div className="space-y-4">
                {section.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">{item.label}</label>
                    <div className="flex-1 max-w-xs ml-4">
                      {item.type === 'input' && (
                        <input
                          type="text"
                          defaultValue={item.value as string}
                          className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-custom"
                        />
                      )}
                      {item.type === 'textarea' && (
                        <textarea
                          defaultValue={item.value as string}
                          rows={2}
                          className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-custom resize-none"
                        />
                      )}
                      {item.type === 'select' && (
                        <select className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-custom">
                          <option value={item.value as string}>{item.value as string}</option>
                        </select>
                      )}
                      {item.type === 'toggle' && (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked={item.value as boolean}
                            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Site Logo & Branding */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Palette className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Branding</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Site Logo</label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                <img 
                  src="/lovable-uploads/b0c00b55-d393-495d-b9e7-ca27a59bd8cf.png" 
                  alt="ASA Logo" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Favicon</label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                <img 
                  src="/lovable-uploads/b0c00b55-d393-495d-b9e7-ca27a59bd8cf.png" 
                  alt="Favicon" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Favicon
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* System Status */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-success/10 rounded-lg">
            <SettingsIcon className="h-5 w-5 text-success" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">System Status</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Database</span>
            <Badge className="bg-success/10 text-success">Connected</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Email Service</span>
            <Badge className="bg-success/10 text-success">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Storage</span>
            <Badge className="bg-warning/10 text-warning">78% Used</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}