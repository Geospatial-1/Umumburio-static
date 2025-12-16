// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKNFEBMK9MF3-1P6hCsaE2aLKXIh7-nUw",
    authDomain: "newumumburio.firebaseapp.com",
    databaseURL: "https://newumumburio-default-rtdb.firebaseio.com",
    projectId: "newumumburio",
    storageBucket: "newumumburio.firebasestorage.app",
    messagingSenderId: "1094768102620",
    appId: "1:1094768102620:web:cbd03620a8c2eb7db6b819"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

// Authentication state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log("User signed in:", user.email);
        checkUserRole(user.uid);
    } else {
        // User is signed out
        console.log("User signed out");
        // Redirect to login if on protected page
        if (window.location.pathname.includes('dashboard')) {
            window.location.href = 'login.html';
        }
    }
});

// Check user role and redirect to appropriate dashboard
function checkUserRole(userId) {
    database.ref('users/' + userId).once('value')
        .then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                const role = userData.role;
                const currentPage = window.location.pathname;
                
                // Redirect based on role
                if (role === 'admin' && !currentPage.includes('admin-dashboard')) {
                    window.location.href = 'admin-dashboard.html';
                } else if (role === 'executive' && !currentPage.includes('executive-dashboard')) {
                    window.location.href = 'executive-dashboard.html';
                } else if (role === 'member' && !currentPage.includes('member-dashboard')) {
                    window.location.href = 'member-dashboard.html';
                }
            }
        })
        .catch((error) => {
            console.error("Error checking user role:", error);
        });
}

// Sign up function
function signUp(email, password, userData) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User created successfully
            const user = userCredential.user;
            
            // Add user data to database
            return database.ref('users/' + user.uid).set({
                email: user.email,
                role: userData.role || 'member',
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                status: 'pending'
            });
        });
}

// Sign in function
function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

// Sign out function
function signOut() {
    return auth.signOut()
        .then(() => {
            window.location.href = 'login.html';
        });
}

// Get current user data
function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const user = auth.currentUser;
        if (user) {
            database.ref('users/' + user.uid).once('value')
                .then((snapshot) => {
                    const userData = snapshot.val();
                    resolve({
                        uid: user.uid,
                        email: user.email,
                        ...userData
                    });
                })
                .catch(reject);
        } else {
            reject(new Error('No user signed in'));
        }
    });
}

// Submit loan application
function submitLoanApplication(applicationData) {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
    
    const applicationRef = database.ref('loanApplications').push();
    return applicationRef.set({
        ...applicationData,
        userId: user.uid,
        status: 'pending',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        reviewedBy: null,
        approvedBy: null,
        approvedAt: null
    });
}

// Get user's loan applications
function getUserLoans(userId) {
    return database.ref('loanApplications')
        .orderByChild('userId')
        .equalTo(userId)
        .once('value');
}

// Submit new event
function createEvent(eventData) {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
    
    const eventRef = database.ref('events').push();
    return eventRef.set({
        ...eventData,
        createdBy: user.uid,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        status: 'pending'
    });
}

// Get all events
function getEvents() {
    return database.ref('events').once('value');
}

// Submit membership application
function submitMembershipApplication(formData) {
    const applicationRef = database.ref('membershipApplications').push();
    return applicationRef.set({
        ...formData,
        status: 'pending',
        submittedAt: firebase.database.ServerValue.TIMESTAMP,
        reviewedBy: null,
        approvedAt: null
    });
}

// Upload image to storage
function uploadImage(file, path) {
    return new Promise((resolve, reject) => {
        const storageRef = storage.ref(path);
        const uploadTask = storageRef.put(file);
        
        uploadTask.on('state_changed',
            (snapshot) => {
                // Progress tracking
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                reject(error);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then((downloadURL) => {
                        resolve(downloadURL);
                    })
                    .catch(reject);
            }
        );
    });
}

// Send notification
function sendNotification(notificationData) {
    const notificationRef = database.ref('notifications').push();
    return notificationRef.set({
        ...notificationData,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        read: false
    });
}

// Get user notifications
function getUserNotifications(userId) {
    return database.ref('notifications')
        .orderByChild('userId')
        .equalTo(userId)
        .once('value');
}

// Export functions
window.firebaseAuth = {
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    submitLoanApplication,
    getUserLoans,
    createEvent,
    getEvents,
    submitMembershipApplication,
    uploadImage,
    sendNotification,
    getUserNotifications
};