/**
 1. 匹配捕获分组 (xxx) 括号包含  会把匹配的括号内部的单独分组   （占字符）
 2. 非捕获分组   (?:xxx) 括号前面包含?:  不分组括号内的匹配  （占字符）
 3. 正向肯定前瞻 (?=xxx) 括号前面包含?=  向后看看必须符合规则（不占字符）
 4. 正向否定后瞻 (?!xxx) 括号前面包含?!  向后看看必须不符合规则（不占字符）
 5. 反向肯定前瞻 (?<=xxx) 括号前面包含?<=  向前看看必须符合规则  (不占字符）
 6. 反向否定后瞻 (?<!xxx) 括号前面包含?<!  向前看看必须不符合规则  (不占字符）

 */

// 1. 匹配捕获分组 (xxx) 括号包含  会把匹配的括号内部的单独分组 （占字符）
console.log('1ab'.match(/1([a-z])([a-z])/))  // [ '1ab', 'a', 'b', index: 0, input: '1ab', groups: undefined ]

// 2. 非捕获分组   (?:xxx) 括号前面包含?:  不分组括号内的匹配  （占字符）
console.log('1ab'.match(/1(?:[a-z])([a-z])/)) // [ '1ab', 'b', index: 0, input: '1ab', groups: undefined ]
console.log('1ab'.match(/1[a-z]([a-z])/)) // [ '1ab', 'b', index: 0, input: '1ab', groups: undefined ]

// 3. 正向肯定前瞻 (?=xxx) 括号前面包含?=  向后看看必须符合规则（不占字符）
//  1的后面肯定是小写字母，也不占用字符，继续匹配a
console.log('1a'.match(/1(?=[a-z])([a-z])/)) // [ '1a', 'a', index: 0, input: '1a', groups: undefined ]
console.log('1a'.match(/1([a-z])([a-z])/)) // null

// 4. 正向否定后瞻 (?!xxx) 括号前面包含?!  向后看看必须不符合规则（不占字符）
// 1的后面不是大写字母，也不占用字符,继续匹配a
console.log('1a'.match(/1(?![A-Z])([a-z])/)) // [ '1a', 'a', index: 0, input: '1a', groups: undefined ]


// 5. 反向肯定前瞻 (?<=xxx) 括号前面包含?<=  向前看看必须符合规则  (不占字符）
// 1的前面必须是大写字母，不占用字符
console.log('1a'.match(/(?<=[A-Z])1([a-z])/)) // null
console.log('A1a'.match(/(?<=[A-Z])1([a-z])/)) //[ '1a', 'a', index: 1, input: 'A1a', groups: undefined ]
console.log('A1a'.match(/[A-Z](?<=[A-Z])1([a-z])/)) //[ 'A1a', 'a', index: 1, input: 'A1a', groups: undefined ]

// 6. 反向否定后瞻 (?<!xxx) 括号前面包含?<!  向前看看必须不符合规则  (不占字符）
// 1的前面必须不是大写字母，不占用字符
console.log('1a'.match(/(?<![A-Z])1([a-z])/)) // [ '1a', 'a', index: 0, input: '1a', groups: undefined ]


/**
 7. 贪婪模式  默认是贪婪模式匹配  匹配最多的字符
 8. 非贪婪模式  量词后面添加?  匹配最少的字符
 */

// 贪婪的匹配多个（默认）
console.log('aaa'.match(/[a-z]+/)) // [ 'aaa', index: 0, input: 'aaa', groups: undefined ]
// 非贪婪模式 匹配最少的
console.log('aaa'.match(/[a-z]+?/)) // [ 'a', index: 0, input: 'aaa', groups: undefined ]
