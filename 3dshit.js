// warning: this code is messing and contains 1 more peter griffin than you will find in your average js file





let canv = document.getElementById("screen");
let ctx = canv.getContext("2d", {
    willReadFrequently: true
});

const gpu = new GPU.GPU();
const settings = {
    output: [2]
}

const project = gpu.createKernel(function(coords,FOV) {
    /*
    holy crap lois i'm javascript code running the gpu from the browser without any cringe libraries
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⠶⠶⠶⠶⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣾⣟⣋⣀⢀⣀⣤⣤⡾⠿⠿⠿⣿⣷⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⡟⠛⢻⡿⣿⣿⣦⡀⠀⢠⡾⡿⠯⠽⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⡇⣿⣿⣷⢴⡏⠉⣧⠀⠀⢹⠒⢻⣀⣘⡇⠀⢸⠷⠶⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⡿⠉⠁⠀⠀⠀⠘⣧⠀⠀⠀⢀⡼⠀⠉⠁⠀⠉⢱⡏⠀⠀⠰⢄⠑⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⢹⠇⠀⠀⠀⠀⠀⠀⣈⡙⠒⠒⠉⠀⢠⣄⣀⣀⣀⡼⠃⠀⠀⠀⠈⢣⠈⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⢧⡾⠀⠀⠀⠀⠀⠀⠀⠉⠓⠦⢄⣀⣀⠀⠈⠉⢉⣁⣐⡶⠀⠀⠀⠀⠀⠁⢸⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣬⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠀⠀⠉⢲⡄⠀⠀⠀⠀⢰⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⢹⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡼⠋⠀⠀⠀⠀⠀⢈⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠶⣏⡀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢷⡀⠀⠀⠀⠀⠐⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⣀⠀⠀⠀⠀⢨⡇⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡾⣗⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢯⣀⣀⣀⡴⠻⣄⣂⣀⡴⠟⠀⠀⠀⠀⠀⠀⢿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡴⣯⠀⠙⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⢳⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡤⠚⠉⣀⣀⣈⣳⡀⠈⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠇⠀⡟⠦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠊⠁⣠⠖⠋⠁⠀⠀⠉⠻⣆⠀⠈⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡴⠁⢀⡞⠀⠀⠀⠉⠲⢄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣠⠞⠁⢀⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⢄⡀⠀⠉⠳⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠏⠀⢠⡞⠀⠀⠀⠀⠀⠀⠀⠙⠶⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡠⠊⠁⠀⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠦⣀⠀⠀⠉⠓⠦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠋⠁⠀⡴⠋⠀⠀⢰⡀⠀⠀⠀⠀⠀⠀⠈⢳⠲⣄⠀
⠀⠀⠀⣠⡾⠥⠤⠤⠬⠤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠓⢤⣀⠀⠀⠀⠉⠓⠒⠤⢤⣀⡀⠀⣠⣞⣉⠀⠀⢠⠞⠁⠀⠀⠀⠘⡇⠀⠀⠀⠀⠀⠀⠀⢸⡆⢸⢄
⠀⡴⢋⣁⣠⠤⠄⠒⠠⠀⠀⠀⠉⠳⢤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠲⢤⣀⠀⠀⢀⡴⠚⠛⢷⡏⠀⠈⢷⠔⠁⠀⠀⠀⠀⠀⠀⣿⣆⠀⠀⠀⠀⠀⠀⣸⠁⡸⠀
⢀⡿⠋⠉⢀⣀⣀⡤⠤⢤⣀⣀⠀⠀⠀⠙⢦⡀⠀⠀⠀⢀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠲⢾⠀⠀⢠⣷⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣆⠀⠀⠀⠀⣰⠇⠐⠁⢀
⡞⢀⡴⠚⠉⣠⠞⠁⠀⠀⠀⠈⠙⢦⡀⠀⠀⢳⡀⠀⣰⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⢳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡃⢀⣤⠞⠁⠀⠀⣠⠏
⠙⣿⠀⠀⣼⠉⠀⠀⠀⠀⠀⠀⠀⠀⢩⢦⠀⣤⣧⠜⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣍⣥⢔⣠⡴⠛⠁⢠
⠀⢹⠀⢠⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠎⢧⢸⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣟⠉⠁⠀⠀⢰⣜
⠀⠘⣇⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣞⡾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠿⣿⢿⠟⠒⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡧⠀⠀⠀⣌⠇
⠀⠀⠹⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡀⠀⠀⡜⠀
⠀⠀⠀⢻⣳⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠟⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢇⠀⣰⠃⠀
⠀⠀⠀⠀⠹⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢹⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⢤⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⢻⡀⠀
⠀⠀⠀⠀⠀⣸⣷⡀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⡟⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠹⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⡇⠀
⠀⠀⠀⢠⣴⡿⠞⠿⣄⠀⠀⢀⣼⠁⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠇⣰⢣⡀
⠀⠀⠀⠸⣼⣦⣠⣶⠿⢦⣤⣾⣷⡀⠀⠀⠀⠀⡅⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠀⠇⢰⠃
⠀⠀⠀⠀⠀⠉⢿⡇⠀⢰⡏⠀⣻⡟⠛⢦⠀⢀⢿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣤⣼⠇⠀⠀⠀⠀⠀⠀⢠⡆⢀⣴⣃⢀⣠⠏⠀
⠀⠀⠀⠀⠀⠀⠈⣿⡦⣼⡇⠀⢻⣇⠀⢸⠀⢨⠏⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢉⡟⠀⠀⠀⠀⠀⠀⣠⣿⣴⡏⠉⠉⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣦⣼⣿⣦⣬⣴⣿⣶⣤⣤⣌⣳⣄⠀⠀⠀⠀⠘⢦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠞⠀⠀⠀⣀⣤⣴⣿⣿⣿⡿⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢿⡇⠀⠙⠙⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣤⡤⣤⣭⣿⣭⣔⣀⣀⣀⣀⣀⣀⣀⣤⡤⠴⠒⠋⠉⠙⢿⣿⣿⣿⣿⠉⣿⢿⣿⣷⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡂⠀⠀⠀⠀⠈⠉⠙⠛⠿⠿⢿⣿⣿⣿⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⣀⣜⣼⣿⠿⠟⠻⠀⠈⣸⣿⠏⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠻⠇⠀⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠟⠿⠶⠤⠤⠶⠞⠋⠁⠀⠀⠀⠀⠀⣴⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠤⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⢸⢹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡏⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⣿⣿⣿⣿⣾⣇⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣾⣿⣿⣿⣿⣿⣿⣶⣾⣧⡀⠀⠀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣇⡀⠀⠀⠀⠀⠀⣀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡞⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠙⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠛⠛⠛⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠛⠛⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀


    */
    let onedivz = 1/coords[2]
    return (FOV*coords[this.thread.x])*onedivz
}).setOutput([2])

gpu.addFunction(function project(coords,FOV) {
    let onedivz = 1/coords[2]
    return [(FOV*coords[0])*onedivz,(FOV*coords[1])*onedivz]
})

const rotate = gpu.createKernel(function(coords,coordsb,matrix) {
    return ((matrix[this.thread.x*3]*coords[0]) + (matrix[(this.thread.x*3) + 1]*coords[1]) + (matrix[(this.thread.x*3) + 2]*coords[2])) + coordsb[this.thread.x]

}).setOutput([3])



const genRotationMatrix = gpu.createKernel(function(rotation) {
    let sx = Math.sin(rotation[0])
    let sy = Math.sin(rotation[1])
    let sz = Math.sin(rotation[2])
    let cx = Math.cos(rotation[0])
    let cy = Math.cos(rotation[1])
    let cz = Math.cos(rotation[2])
    // let [sx, sy, sz] = [,,]
    // let [cx, cy, cz] = [,,]
    // this code is bad and i don't like it but the max array size is 4 : (
    
    if (this.thread.x == 0){
        return (cx * cz) - (sx*sy*sz)}
    else if (this.thread.x == 1){
        return 0 - (sz*cy)}
    else if (this.thread.x == 2){
        return (sy*cx*sz) + (sx*cz)}
    else if (this.thread.x == 3){
        return (sy*sx*cz) + (cx*sz)}
    else if (this.thread.x == 4){
        return cy*cz}
    else if (this.thread.x == 5){
        return (sx*sz) - (sy*cx*cz)}
    else if (this.thread.x == 6){
        return 0 - (sx*cy)}
    else if (this.thread.x == 7){
        return sy}
    else if (this.thread.x == 8){
        return cy*cx}

    
    // return [
    //     ,
    //     ,
    //     ,
    //     ,
    //     ,
    //     ,
    //     ,
    //     ,
        
    // ]
}).setOutput([9])

const normalize = gpu.createKernel(function(vec) {
    return (vec[this.thread.x] / Math.sqrt(vec[0]**2 + vec[1]**2 + vec[2]**2))
}).setOutput([3])

const addVects = gpu.createKernel(function(vec1,vec2) {
    return vec1[this.thread.x] + vec2[this.thread.x]
}).setOutput([3])

const multVect = gpu.createKernel(function(vec,scalar) {
    return vec[this.thread.x]*scalar
}).setOutput([3])

const dot = gpu.createKernel(function(a,b) {
    return ((a[0]*b[0]) + (a[1]*b[1]) + (a[2]*b[2]))
}).setOutput([1])

// const edge = gpu.createKernel(function(a,b,c) {
//     return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
// }).setOutput([1])
gpu.addFunction(function edge(c,b,a) {
        return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
        
})

gpu.addFunction(function pixel(a,b,c,p,pa,pb,pc) {
    // [depth, u, v, w]
    const minX = Math.min(Math.min(pa[0],pb[0]),pc[0])
    const minY = Math.min(Math.min(pa[1],pb[1]),pc[1])
    const maxX = Math.max(Math.max(pa[0],pb[0]),pc[0])
    const maxY = Math.max(Math.max(pa[1],pb[1]),pc[1])
    if ((p[0] > minX) && (p[0] < maxX) && (p[1] > minY) && (p[1] < maxY)) {
        let ABC = edge(pa,pb,pc)
        let ABP = edge(pa,pb,p)
        let BCP = edge(pb,pc,p)
        let CAP = edge(pc,pa,p)
        if (ABP >= 0 && BCP >= 0 && CAP >= 0) {
            let u = BCP/ABC
            let v = CAP/ABC
            let w = ABP/ABC // isn't w also the 4th dimension, kinda shoddy design on the mathematicians' parts
            let depth = 1/(u/a[2] + v/b[2] + w/c[2]) //  * (a[2]) * (b[2]) * (c[2])    this formula was generated by chatgpt because cringe
            return [depth, u, v, w]
        }
        else {
            return [-1, -1, -1, -1]
        }
    }
    else {
        return [-1,-1,-1,-1]
    }

    
})

const intGenDepthBuffer = gpu.createKernel(function(triangles,length,width,height) {
    /*
    triangle list format
    [
        [x1, y1, z1, px1, py1],
        [x2, y2, z2, px2, py2],
        [x3, y3, z3, px3, py3],

        [x1, y1, z1, px1, py1],
        [x2, y2, z2, px2, py2],
        [x3, y3, z3, px3, py3],
        ...
    ]
    */


    let heldZ = 99999 // i could just have this use toReturn[0] but i can't be bothered
    let toReturn = [-1,-1,-1,-1]

    for (let i = 0; i < length; i += 15) {
        // it took me 20 minutes to remember gpu.js flattens input arrays : |
        let t1 = [triangles[i],triangles[i+1],triangles[i+2]]
        let t2 = [triangles[i+5],triangles[i+6],triangles[i+7]]
        let t3 = [triangles[i+10],triangles[i+11],triangles[i+12]]
        let p1 = [triangles[i+3],triangles[i+4],0] // "nooo you can't just have arrays of different lengths in the arguments" - 🤓🤓🤓🤓🤓(aka gpu.js)
        let p2 = [triangles[i+8],triangles[i+9],0]
        let p3 = [triangles[i+13],triangles[i+14],0]
        
        
        let heldP = pixel(t1,t2,t3,[this.thread.x-(width/2),this.thread.y-(height/2),0],p1,p2,p3)
        if (heldP[0] != -1) {
            if (heldP[0] < heldZ) {
                heldZ = heldP[0]
                toReturn = heldP

            }
        }
    }
    //return toReturn
    if (toReturn[0] == -1) {
        this.color(1,1,1)
    }
    let b = (toReturn[0]/50) / ((toReturn[0]/50)+1)
    b = 1 - b // b is the visual output
    this.color(b,b,b)


}, {
    dynamicOutput: true,
    output: [5,5]
}).setGraphical(true)

function genDepthBuffer(triangles,width,height) {
    intGenDepthBuffer.setOutput([width,height]) // make the function size dynamic
    intGenDepthBuffer(triangles,triangles.length,width,height)
    ctx.putImageData(new ImageData(intGenDepthBuffer.getPixels(),width,height),0,0)
}

// const multiplyMatrix = gpu.createKernel(function(a, b) {
//     let sum = 0;
//     for (let i = 0; i < 2; i++) {
//         sum += a[this.thread.y][i] * b[i][this.thread.x];
//     }
//     return sum;
// }).setOutput([2, 2]);

// const c = multiplyMatrix([4,4,4,4], [4,4,4,4]);





export { project, rotate, genRotationMatrix, normalize, addVects, multVect, dot, genDepthBuffer }; // note to self: typescript formatter doesn't like it if you use export {func as "string"}