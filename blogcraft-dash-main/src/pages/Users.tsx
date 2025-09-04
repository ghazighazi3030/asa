import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Shield,
  Mail,
  Calendar,
  User,
  UserPlus,
  Lock,
  Unlock,
  Send
} from "lucide-react";

const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-08-15",
    lastLogin: "2024-01-15",
    postsCount: 24,
    avatar: null
  },
  {
    id: 2,
    name: "Mike Chen", 
    email: "mike.chen@example.com",
    role: "editor",
    status: "active", 
    joinDate: "2023-09-20",
    lastLogin: "2024-01-14",
    postsCount: 18,
    avatar: null
  },
  {
    id: 3,
    name: "Alex Kumar",
    email: "alex.kumar@example.com", 
    role: "author",
    status: "active",
    joinDate: "2023-10-05",
    lastLogin: "2024-01-13",
    postsCount: 12,
    avatar: null
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    role: "reader",
    status: "inactive",
    joinDate: "2023-11-12",
    lastLogin: "2023-12-20",
    postsCount: 0,
    avatar: null
  }
];

const roleColors = {
  admin: "bg-destructive/10 text-destructive",
  editor: "bg-primary/10 text-primary", 
  author: "bg-accent/10 text-accent",
  reader: "bg-muted text-muted-foreground"
};

const statusColors = {
  active: "bg-success/10 text-success",
  inactive: "bg-warning/10 text-warning",
  suspended: "bg-destructive/10 text-destructive"
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "reader",
    sendInvite: true
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      case "oldest":
        return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
      case "name":
        return a.name.localeCompare(b.name);
      case "posts":
        return b.postsCount - a.postsCount;
      default:
        return 0;
    }
  });

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === sortedUsers.length 
        ? [] 
        : sortedUsers.map(user => user.id)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on users:`, selectedUsers);
    setSelectedUsers([]);
  };

  const handleUserAction = (action: string, userId: number) => {
    console.log(`Action: ${action} on user:`, userId);
  };

  const handleAddUser = () => {
    console.log('Adding user:', newUser);
    setShowAddUser(false);
    setNewUser({ name: "", email: "", role: "reader", sendInvite: true });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="mt-2 text-muted-foreground">Manage user accounts, roles, and permissions.</p>
        </div>
        <Button className="mt-4 sm:mt-0" size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold text-foreground">{users.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-foreground">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Edit className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Authors</p>
              <p className="text-2xl font-bold text-foreground">
                {users.filter(u => u.role === 'author' || u.role === 'editor' || u.role === 'admin').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Mail className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">New This Month</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search and Primary Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="reader">Reader</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="posts">Most Posts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('activate')}>
                  <Unlock className="mr-1 h-3 w-3" />
                  Activate
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('suspend')}>
                  <Lock className="mr-1 h-3 w-3" />
                  Suspend
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('email')}>
                  <Send className="mr-1 h-3 w-3" />
                  Email
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                  <Trash className="mr-1 h-3 w-3" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/30 border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-foreground w-12">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === sortedUsers.length && sortedUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left py-4 px-6 font-medium text-foreground">User</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Role</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Status</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Join Date</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Last Login</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Posts</th>
                <th className="text-right py-4 px-6 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-b-0 hover:bg-secondary/20 transition-custom">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {user.joinDate}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-foreground">{user.postsCount}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleUserAction('edit', user.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleUserAction('email', user.id)}>
                        <Mail className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUserAction('view', user.id)}>
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction('posts', user.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            View Posts
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction('reset', user.id)}>
                            <Lock className="mr-2 h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'active' ? (
                            <DropdownMenuItem onClick={() => handleUserAction('suspend', user.id)}>
                              <Lock className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleUserAction('activate', user.id)}>
                              <Unlock className="mr-2 h-4 w-4" />
                              Activate User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleUserAction('delete', user.id)}
                            className="text-destructive"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {sortedUsers.length} of {users.length} users
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg">
            <UserPlus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. An invitation email will be sent if enabled.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
                placeholder="Full name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="col-span-3"
                placeholder="email@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reader">Reader</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="invite" className="text-right">
                Send Invite
              </Label>
              <div className="col-span-3">
                <input
                  id="invite"
                  type="checkbox"
                  checked={newUser.sendInvite}
                  onChange={(e) => setNewUser({ ...newUser, sendInvite: e.target.checked })}
                  className="rounded border-border"
                />
                <Label htmlFor="invite" className="ml-2 text-sm text-muted-foreground">
                  Send invitation email to user
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUser(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}