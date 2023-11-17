module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        "arms-full-black": "#010101",
        "arms-black": {  DEFAULT: '#201F1F',  50: '#BAB7B7',  100: '#B0ADAD',  200: '#9C9898',  300: '#878484',  400: '#736F6F',  500: '#5E5B5B',  600: '#494747',  700: '#353333',  800: '#201F1F',  900: '#040303',  950: '#000000'},
        "arms-white": "#FFFFFF",
        "arms-gray": "#E0E0E0",
        "arms-light-gray": "#535353",
        "arms-yellow": "#F9C406",
        "arms-blue": "#6506F9",
        "arms-purple": "#2A0E47",
        "arms-blue-dark": "#4604AE",
      },
      fontSize: {
        "8.5xl": "100px",
        "title": "500%",
      },
    },
  },
  plugins: [],
};
