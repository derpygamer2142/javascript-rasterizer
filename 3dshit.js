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



const rotate = gpu.createKernel(function(coords,coordsb,matrix) {
    return ((matrix[this.thread.x]*coords[0]) + (matrix[this.thread.x+1]*coords[1]) + (matrix[this.thread.x+2]*coords[2])) + coordsb[this.thread.x]

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
    return ((vec[this.thread.x] ** 2) / (vec[0]**2 + vec[1]**2 + vec[2]**2))
}).setOutput([3])

const addVects = gpu.createKernel(function(vec1,vec2) {
    return vec1[this.thread.x] + vec2[this.thread.x]
}).setOutput([3])

const multVect = gpu.createKernel(function(vec,scalar) {
    return vec[this.thread.x]*scalar
}).setOutput([3])

// const multiplyMatrix = gpu.createKernel(function(a, b) {
//     let sum = 0;
//     for (let i = 0; i < 2; i++) {
//         sum += a[this.thread.y][i] * b[i][this.thread.x];
//     }
//     return sum;
// }).setOutput([2, 2]);

// const c = multiplyMatrix([4,4,4,4], [4,4,4,4]);





export { project, rotate, genRotationMatrix, normalize, addVects, multVect }; // note to self: typescript formatter doesn't like it if you use export {func as "string"}