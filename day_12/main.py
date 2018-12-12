
def convert_into_list():
    input = open('./input.txt', 'r').read();
    input = input.split('\n');

    alive = []
    dead = []

    for row in input:
        combination = row.split(" ")[0]
        status = row.split(" ")[2]

        if status == '#':
            alive.append(combination)

    return alive

# print(convert_into_list());

input = '#...#####.#..##...##...#.##.#.##.###..##.##.#.#..#...###..####.#.....#..##..#.##......#####..####...'
global sumx
sumx = 0

def parse_generation(initial_input):
    comparisons = convert_into_list()

    next_gen = ['.'] * len(initial_input)
    #print(initial_input)
    for index, char in enumerate(initial_input):
        if index >= 2 and index <= len(initial_input) - 3:
            result = []

            for num in range(-2, 3):
                result.append(initial_input[index + num])

            result = "".join(result)
            # print(result)

            if check_result(result):
                next_gen[index] = '#'
            else:
                next_gen[index] = '.'
    next_gen = "".join(next_gen)

    return next_gen

def check_result(result):
    list = convert_into_list()
    if result in list:
        # sumx += 1
        return True;

for i in range(0, 20):
    input = parse_generation(input)
    print(i, input)






