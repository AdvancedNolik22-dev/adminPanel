import { User, Onboarding}  from "@/types/user";

const API_URL = 'http://localhost:3001';
export async function getUsers(page = 1, limit = 5, search = '', filter = '') {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  try {
    let url = `${API_URL}/users`;
    
    if (filter) {
      url += `?status=${filter}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    let allUsers = await response.json() as User[];
    if (search) {
      const searchLower = search.toLowerCase();
      allUsers = allUsers.filter(user => {
        return (
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.profile.company.toLowerCase().includes(searchLower)
        );
      });
    }
    const totalCount = allUsers.length;
    const startIndex = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(startIndex, startIndex + limit);
    
    console.log('Search Results:', { 
      search,
      filter,
      totalCount, 
      paginatedCount: paginatedUsers.length,
      page,
      limit
    });
    
    return {
      users: paginatedUsers,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      users: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: page,
    };
  }
}
export async function getUserById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const response = await fetch(`${API_URL}/users/${id}`);
  return await response.json() as User;
}
export async function getOnboarding(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await fetch(`${API_URL}/onboarding/${id}`);
  return await response.json() as Onboarding;
}
export async function updateSubscription(userId: string, subscription: Partial<User['subscription']>) {
  // Get current user data
  const user = await getUserById(userId);
  
  // Create update payload with both fields
  const updateData: { 
    subscription: User['subscription'];
    plan?: string;
  } = { 
    subscription: { ...user.subscription, ...subscription } 
  };
  
  // If plan is being updated, also update the top-level plan field
  if (subscription.plan) {
    updateData.plan = subscription.plan;
  }
  
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  
  return await response.json() as User;
}
export async function updateOnboardingStep(onboardingId: string, stepId: string, completed: boolean) {
  const onboarding = await getOnboarding(onboardingId);
  const updatedSteps = onboarding.steps.map(step => 
    step.id === stepId ? { ...step, completed } : step
  );
  
  const response = await fetch(`${API_URL}/onboarding/${onboardingId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ steps: updatedSteps }),
  });
  
  return await response.json() as Onboarding;
} 