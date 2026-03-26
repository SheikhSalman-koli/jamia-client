
import GoogleProvider from "next-auth/providers/google";
import baseUrl from "./axios";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                try {
                    // এখানে আপনার এক্সপ্রেস ব্যাকএন্ডে ইউজার ডাটা পাঠাবেন

                    const userData = {
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        googleId: user.id,
                        role: 'user',
                        createdAt:new Date().toISOString()
                    }

                    const {data} = await baseUrl.get(`/users/byemail?email=${userData.email}`)
               
                    if(!data?.data){
                        await baseUrl.post(`/users`, userData);
                    }
                    
                    return true; // লগইন সাকসেস
                } catch (error) {
                    console.error("Error saving user to DB:", error);
                    return false; // ডাটাবেজে সেভ না হলে লগইন হবে না
                }
            }
            return true;
        },
  
        async session({ session }) {
            try {
                // Fetch the latest user data from your DB using the email
                const { data } = await baseUrl.get(`/users/byemail?email=${session?.user.email}`);
                
                if (data?.data) {
                    // Inject the role from your database into the session object
                    session.user.role = data.data.role;
                    // You can also inject the DB ID if you need it for marketplace ads
                    session.user.id = data.data._id; 
                }
            } catch (error) {
                console.error("Error fetching role for session:", error);
            }
            return session;
        },
    },

    pages: {
        signIn: '/login'
    }
}
