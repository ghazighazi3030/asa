import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Database, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  Settings,
  ExternalLink
} from "lucide-react";
import { debugUtils } from "@/lib/debug";

export default function DatabaseStatus() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const result = await debugUtils.getDatabaseStatus();
      setStatus(result);
    } catch (error) {
      console.error('Error checking database status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const createTestPost = async () => {
    setLoading(true);
    try {
      const result = await debugUtils.createTestPost();
      console.log('Test post result:', result);
      await checkStatus(); // Refresh status
    } catch (error) {
      console.error('Error creating test post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!status) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Checking database status...</span>
        </div>
      </Card>
    );
  }

  const isConnected = status.connection.connected;
  const envConfigured = status.envVars.VITE_SUPABASE_URL === 'Set' && 
                       status.envVars.VITE_SUPABASE_ANON_KEY === 'Set';

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Database Status</h3>
          <Button variant="outline" size="sm" onClick={checkStatus} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        <div className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Database Connection</span>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <>
                  <CheckCircle className="h-4 w-4 text-success" />
                  <Badge className="bg-success/10 text-success">Connected</Badge>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-destructive" />
                  <Badge className="bg-destructive/10 text-destructive">Disconnected</Badge>
                </>
              )}
            </div>
          </div>

          {/* Environment Variables */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Environment Config</span>
            <div className="flex items-center space-x-2">
              {envConfigured ? (
                <>
                  <CheckCircle className="h-4 w-4 text-success" />
                  <Badge className="bg-success/10 text-success">Configured</Badge>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <Badge className="bg-warning/10 text-warning">Missing</Badge>
                </>
              )}
            </div>
          </div>

          {/* Current Mode */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Mode</span>
            <Badge variant="secondary">
              {isConnected ? 'Database' : 'Mock Data'}
            </Badge>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 mt-6">
          <Button variant="outline" size="sm" onClick={createTestPost} disabled={loading}>
            <Database className="mr-2 h-4 w-4" />
            Test Post Creation
          </Button>
          {!envConfigured && (
            <Button variant="outline" size="sm" asChild>
              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Setup Supabase
              </a>
            </Button>
          )}
        </div>
      </Card>

      {/* Alerts */}
      {!envConfigured && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Supabase environment variables are not configured. The application is running in mock data mode. 
            To enable database functionality, please set up your Supabase project and add the environment variables.
          </AlertDescription>
        </Alert>
      )}

      {envConfigured && !isConnected && (
        <Alert>
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            Environment variables are set but database connection failed. Please check your Supabase configuration.
            Error: {status.connection.error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}