import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { browser } from '$app/environment';
import { readable } from 'svelte/store';

export default readable({ isActive: false, isLoggedIn: false, userId: '' }, (set) => {
    if (browser) {
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                set({ isActive: true, isLoggedIn: true, userId: user.uid });
            } else {
                set({ isActive: true, isLoggedIn: false, userId: '' });
            }
        })
    }
})