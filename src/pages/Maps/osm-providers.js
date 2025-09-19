import { Box } from '@mui/material';

const API_KEY = 'qqMpAwPMo3sB0wwh5VrD';

export default {
    maptiler: {
        url: `https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${API_KEY}`,
        attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    },
    maptilerSatellite: {
        url: `https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=${API_KEY}`,
        attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    },
    maptilerOutdoor: {
        url: `https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}.png?key=${API_KEY}`,
        attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    },
    openStreetMap: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
};