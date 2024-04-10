// warning: this code is messing and contains 1 more peter griffin than you will find in your average js file

const canv = document.getElementById("screen");
const ctx = canv.getContext("2d");

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
    // [depth,ABP,BCP,CAP]
    const minX = Math.min(Math.min(pa[0],pb[0]),pc[0])
    const minY = Math.min(Math.min(pa[1],pb[1]),pc[1])
    const maxX = Math.max(Math.max(pa[0],pb[0]),pc[0])
    const maxY = Math.max(Math.max(pa[1],pb[1]),pc[1])
    if ((p[0] > minX) && (p[0] < maxX) && (p[1] > minY) && (p[1] < maxY)) {
        let ABC = edge(a,b,c)
        let ABP = edge(a,b,p)
        let BCP = edge(b,c,p)
        let CAP = edge(c,a,p)
        if (ABP >= 0 && BCP >= 0 && CAP >= 0) {
            
        }
        else {
            return [-1, -1, -1, -1]
        }
    }
    else {
        return [-1,-1,-1,-1]
    }

    
})

const internalTri = gpu.createKernel(function(a,b,c,color) {
    // https://jtsorlinis.github.io/rendering-tutorial/
    
    const minX = Math.min(Math.min(a[0],b[0]),c[0])
    const minY = Math.min(Math.min(a[1],b[1]),c[1])

    let ABP = edge(a,b,[this.thread.x+minX,this.thread.y+minY])
    let BCP = edge(b,c,[this.thread.x+minX,this.thread.y+minY])
    let CAP = edge(c,a,[this.thread.x+minX,this.thread.y+minY])
    if (ABP >= 0 && BCP >= 0 && CAP >= 0) {
        //this.color(0,0,0)
        let col = [color[0],color[1],color[2]]
        return col
    }
    //this.color(1,1,1)
    return [-1,-1,-1]

},{
    constants: { size: 5 },
    output: [5, 5],
    dynamicOutput: true,
})//.setGraphical(true)



// const multiplyMatrix = gpu.createKernel(function(a, b) {
//     let sum = 0;
//     for (let i = 0; i < 2; i++) {
//         sum += a[this.thread.y][i] * b[i][this.thread.x];
//     }
//     return sum;
// }).setOutput([2, 2]);

// const c = multiplyMatrix([4,4,4,4], [4,4,4,4]);





export { project, rotate, genRotationMatrix, normalize, addVects, multVect, dot }; // note to self: typescript formatter doesn't like it if you use export {func as "string"}