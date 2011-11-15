function assert(x,m) {
  if(x !== true) {
    document.write("<p>");
    document.write(m+"["+x+"]");
    document.write("</p>");
  }
}

assert(id(5)===5,"TEST[1] FAILED!");
assert(id()(5)===5,"TEST[2] FAILED!");

assert(const_(5,6)===5,"TEST[3] FAILED!");
assert(const_(5)(6)===5,"TEST[4] FAILED!");

assert(compose(add(3),add(4))(1)===8,"TEST[5] FAILED!");
assert(composeMultiple([add(2),add(2),add(2)])(1)===7,"TEST[6] FAILED!");

assert(fapp(-1,abs)===abs(-1),"TEST[7] FAILED!");

assert(flip(sub,5,2)!==sub(5,2),"TEST[8] FAILED!");
assert(flip(sub,5,2)===sub(2,5),"TEST[9] FAILED!");

assert(even(2)===true,"TEST[10] FAILED!");
assert(odd(2)===false,"TEST[11] FAILED!");

assert(abs(-1)===abs(1),"TEST[12] FAILED!");

assert(gcd(6)(9)===3,"TEST[13] FAILED!");

assert(lcm(2,10)===10,"TEST[14] FAILED!");
assert(lcm(3,10)===30,"TEST[15] FAILED!");

assert(until(flip(gt,100),mul(2),1)===128,"TEST[16] FAILED!");

assert(fst(pair(3,5))===3,"TEST[17] FAILED!");
assert(snd(pair(3)(5))===5,"TEST[18] FAILED!");

assert(add(3,5)===sub(11,3),"TEST[19] FAILED!");
assert(mul(3,5)===div(45,3),"TEST[20] FAILED!");
assert(mod(10,3)===1,"TEST[21] FAILED!");
assert(pow(2,3)===8,"TEST[22] FAILED!");

assert(head([1,2,3])===1,"TEST[23] FAILED!");
assert(head(tail([1,2,3]))===2,"TEST[24] FAILED!");
assert(head(reverse([1,2,3]))===3,"TEST[25] FAILED!");

assert(head(map(mul(2),[1,2,1]))===last(map(mul(2),[1,2,1])),"TEST[26] FAILED!");
assert(foldl(sub,0,[1,2,3])===-6,"TEST[27] FAILED!");
assert(foldl1(sub,[0,1,2,3])===-6,"TEST[28] FAILED!");
assert(foldr(sub,0,[1,2,3])===2,"TEST[29] FAILED!");
assert(foldr1(sub,[0,1,2,3])===-2,"TEST[30] FAILED!");
assert(last(scanl(add)(0)([1,2,3]))===6,"TEST[31] FAILED!");
assert((scanl(add)(0)([1,2,3]))[2]===3,"TEST[32] FAILED!");
assert(last(scanl1(add)([1,2,3]))===6,"TEST[33] FAILED!");
assert((scanl1(add)([1,2,3]))[1]===3,"TEST[34] FAILED!");
assert(last(scanr(add)(0)([1,2,3]))===0,"TEST[35] FAILED!");
assert((scanr(add)(0)([1,2,3]))[2]===3,"TEST[36] FAILED!");
assert(last(scanr1(add)([1,2,3]))===3,"TEST[37] FAILED!");
assert((scanr1(add)([1,2,3]))[1]===5,"TEST[38] FAILED!");

assert(fst(head(zip([1,2],[2,1])))===1,"TEST[39] FAILED!");
assert(snd(head(zip([1,2],[2,1])))===2,"TEST[40] FAILED!");

assert(head(zipWith(add,[1,2,3],[3,2,1]))===4,"TEST[41] FAILED!");

assert(length([1,2,3])===3,"TEST[42] FAILED!");

assert(last([1,2,3])===3,"TEST[43] FAILED!");
assert(last(init([1,2,3,4]))===3,"TEST[44] FAILED!");

assert(head(filter(odd)([1,2,3,5,7]))===1,"TEST[45] FAILED!");

assert(any(eq(3),range(0,4))===true,"TEST[46] FAILED!");

assert(head(snd(break_(eq(4),range(0,5))))===4,"TEST[47] FAILED!");
assert(last(snd(break_(eq(4),range(0,5))))===5,"TEST[48] FAILED!");

assert(sum([1,2,3,4])===10,"TEST[49] FAILED!");
assert(product(range(1,6))===720,"TEST[50] FAILED!");

assert(ladd([1,2],[3,4])[2]===3,"TEST[51] FAILED!");
assert(and(map(eq(5),replicate(6,5)))===true,"TEST[52] FAILED!");
assert(length(replicate(6,5))===6,"TEST[53] FAILED!");

assert(iterate(3,add(3))(0)===9,"TEST[54] FAILED!");
assert(last(take(2,drop(2,[1,2,3,4,5])))===4,"TEST[55] FAILED!");

assert(eq(5,5)===true,"TEST[56] FAILED!");
assert(neq(5,6)===true,"TEST[57] FAILED!");
assert(gt(6,5)===true,"TEST[58] FAILED!");
assert(lt(5,6)===true,"TEST[59] FAILED!");
assert(gt(6,6)===lt(6,6),"TEST[60] FAILED!");
assert(geq(6,6)===leq(6,6),"TEST[61] FAILED!");

assert(and([true,true,false])===false,"TEST[62] FAILED!");
assert(and([true,true,true])===true,"TEST[63] FAILED!");
assert(or([true,false,false])===true,"TEST[64] FAILED!");
assert(or([false,false])===false,"TEST[65] FAILED!");

assert(head(dropWhile(gt(3),[1,2,3,4,5]))===3,"TEST[66] FAILED!");
assert(last(dropWhile(gt(3),[1,2,3,4,5]))===5,"TEST[67] FAILED!");
assert(head(takeWhile(flip(lt,3),[1,2,3,4,5]))===1,"TEST[68] FAILED!");
assert(last(takeWhile(flip(lt,3),[1,2,3,4,5]))===2,"TEST[69] FAILED!");

assert(concat([[1,2],[3,4]])[2]===3,"TEST[70] FAILED!");
assert((concatMap(function(n){return [n,n]})([1,2,3]))[2]===2,"TEST[71] FAILED!");
assert((concatMap(function(n){return [n,n]})([1,2,3]))[0]===1,"TEST[72] FAILED!");
assert((concatMap(function(n){return [n,n]})([1,2,3]))[1]===1,"TEST[73] FAILED!");

assert(unwords(words("One two three"))==="One two three","TEST[74] FAILED!");
assert(words("One two three")[1]==="two","TEST[75] FAILED!");

assert(unlines(lines("One\ntwo\nthree"))==="One\ntwo\nthree","TEST[76] FAILED!");
assert(lines("One\ntwo\nthree")[1]==="two","TEST[77] FAILED!");

assert(all(eq(5),[5,5,5,5,5])===true,"TEST[78] FAILED!");
assert(all(eq(5),[5,5,6,5,5])===false,"TEST[79] FAILED!");
assert(all(eq(5))([5,5,5])===true,"TEST[80] FAILED!");

assert(head(fst(unzip(zip([1,2],[2,1]))))===1,"TEST[81] FAILED!");
assert(head(snd(unzip(zip([1,2],[2,1]))))===2,"TEST[82] FAILED!");

assert(elem("o","foobar")===true,"TEST[83] FAILED!");
assert(notElem("z","foobar")===true,"TEST[84] FAILED!");
assert(elem("z","foobar")===notElem("o","foobar"),"TEST[85] FAILED!");

assert(max(6,5)===max(5,6),"TEST[86] FAILED!");
assert(min(6,5)===min(5,6),"TEST[87] FAILED!");
assert(max(6,5)===6,"TEST[88] FAILED!");
assert(min(6,5)===5,"TEST[89] FAILED!");
assert(max(6,6)===min(6,6),"TEST[90] FAILED!");

assert(minimum([2,1,9,1,8])===1,"TEST[91] FAILED!");
assert(maximum([2,1,9,1,8])===9,"TEST[92] FAILED!");

assert(isJust(Just(0)),"TEST[93] FAILED!");
assert(isNothing(Nothing()),"TEST[94] FAILED!");
assert(isJust(Just(0))!==isNothing(Just(0)),"TEST[95] FAILED!");

assert(fromMaybe(0,lookup("B",zip(["A","B","C"],[1,2,3])))===2,"TEST[96] FAILED!");
assert(fromMaybe(0,lookup("Z",zip(["A","B","C"],[1,2,3])))===0,"TEST[97] FAILED!");

assert(head(sort([13,4,9,8]))===4,"TEST[98] FAILED!");
assert(last(sort([13,4,9,8]))===13,"TEST[99] FAILED!");
assert(concatStr(sort("ab"))===concatStr(sort("ba")),"TEST[100] FAILED!");

assert(map(concatStr)(group(sort("this is me")))[0]==="  ","TEST[101] FAILED!");
assert(map(concatStr)(group(sort("this is me")))[3]==="ii","TEST[102] FAILED!");

assert(fst(pairWith(add(3))(add(4))(0))===3,"TEST[103] FAILED!");
assert(snd(pairWith(add(3))(add(4))(0))===4,"TEST[103] FAILED!");

assert(fst(left(add(3),pair(1,2)))===4,"TEST[104] FAILED!");
assert(snd(right(add(3),pair(1,2)))==5,"TEST[105] FAILED!");

assert(fst(swap(pair(0,10)))===snd(pair(0,10)),"TEST[106] FAILED!");

assert(head(snd(splitAt(2)([0,1,2,3])))===2,"TEST[107] FAILED!");
assert(last(fst(splitAt(2)([0,1,2,3])))===1,"TEST[108] FAILED!");
assert(last(snd(splitAt(2)([0,1,2,3])))===3,"TEST[109] FAILED!");

assert(isAlpha("Foobar")===true,"TEST[110] FAILED!");
assert(isAlpha("Foo9bar")===false,"TEST[111] FAILED!");
assert(isAlphaNum("Foo9bar")===true,"TEST[112] FAILED!");
assert(isAlphaNum("Foo9 bar")===false,"TEST[113] FAILED!");
assert(isNumber("123")===true,"TEST[114] FAILED!");
assert(isNumber("12a")===false,"TEST[115] FAILED!");
assert(isLower("aber")===true,"TEST[116] FAILED!");
assert(isLower("Aber")===false,"TEST[117] FAILED!");
assert(isUpper("ABER")===true,"TEST[118] FAILED!");
assert(isUpper("Aber")===false,"TEST[119] FAILED!");

assert(concatStr(fst(span(isNumber)("123abc456")))==="123","TEST[120] FAILED!");
assert(concatStr(snd(span(isNumber)("123abc456")))==="abc456","TEST[121] FAILED!");

assert(head(fst(partition(lt(3),[1,2,3,4,5])))===4,"TEST[122] FAILED!");
assert(head(snd(partition(lt(3),[1,2,3,4,5])))===1,"TEST[123] FAILED!");
assert(last(snd(partition(lt(3),[1,2,3,4,5])))===3,"TEST[124] FAILED!");
assert(last(fst(partition(lt(3),[1,2,3,4,5])))===5,"TEST[125] FAILED!");

assert(lcmp([1,3,3,7],[1,3,3,7])===true,"TEST[126] FAILED!");
assert(lcmp([1,3,3,7],[1,3,4,7])===false,"TEST[127] FAILED!");
assert(lcmp([1,3,3,7],[1,3,7])===false,"TEST[128] FAILED!");

assert(isPrefixOf([1,3],[1,3,3,7])===true,"TEST[129] FAILED!");
assert(isPrefixOf([1,2],[1,3,3,7])===false,"TEST[130] FAILED!");
assert(isPrefixOf([1,3,3,7],[1,3,3,7])===true,"TEST[131] FAILED!");
assert(isPrefixOf([1,3,3,7,8],[1,3,3,7])===false,"TEST[132] FAILED!");

assert(isSuffixOf([3,7],[1,3,3,7])===true,"TEST[133] FAILED!");
assert(isSuffixOf([3],[1,3,3,7])===false,"TEST[134] FAILED!");
assert(isSuffixOf([1,3,3,7],[1,3,3,7])===true,"TEST[135] FAILED!");
assert(isSuffixOf([1,3,3,7,8],[1,3,3,7])===false,"TEST[136] FAILED!");

assert(isInfixOf([3,3],[1,3,3,7])===true,"TEST[137] FAILED!");
assert(isInfixOf([3,4],[1,3,3,7])===false,"TEST[138] FAILED!");
assert(isInfixOf([1,3,3,7],[1,3,3,7])===true,"TEST[139] FAILED!");
assert(isInfixOf([1,3,4],[1,3])===false,"TEST[140] FAILED!");

assert(lcmp(intersperse(1,[1]),[1]),"TEST[141] FAILED!");
assert(lcmp(intersperse(1,[0,0,0]),[0,1,0,1,0]),"TEST[142] FAILED!");

assert(lcmp(nub([1,3,3,7]),[1,3,7]),"TEST[143] FAILED!");

assert(lcmp(intersect([1,3],[3,7,3,1]),[1,3]),"TEST[144] FAILED!");
assert(lcmp(union([1,3],[2,3,7,3,1]),[1,3,2,7]),"TEST[145] FAILED!");

assert(lcmp(remove(3,[1,3,3,7]),[1,3,7]),"TEST[146] FAILED!");

assert(lcmp(difference([1,3,3],[1,3,7]),[3]),"TEST[147] FAILED!");
assert(lcmp(difference([1,2,3,4],[2,3]),[1,4]),"TEST[148] FAILED!");
assert(lcmp(difference([1,2,3,4],[5]),[1,2,3,4]),"TEST[149] FAILED!");

assert(lcmp(insert(4,[1,2,3,5]),[1,2,3,4,5]),"TEST[150] FAILED!");


var t = concatStr(fromMaybe("",stripPrefix("http://","http://facebook.com")));
assert(t==="facebook.com","TEST[151] FAILED!");
t = stripPrefix("https://","http://facebook.com")
assert(isNothing(t),"TEST[152] FAILED!");

t = concatStr(fromMaybe("",stripSuffix(".com","http://facebook.com")));
assert(t==="http://facebook","TEST[153] FAILED!");
t = stripPrefix(".de","http://facebook.com");
assert(isNothing(t),"TEST[153] FAILED!");

assert(empty([])===true,"TEST[154] FAILED!");
assert(empty([1])===false,"TEST[155] FAILED!");

assert(lcmp(head(transpose([[1,2],[3,4]])),[1,3])===true,"TEST[156] FAILED!");
assert(lcmp(last(transpose([[1,2,6],[3,4,5],[9,8]])),[6,5]),"TEST[157] FAILED!");

assert(concatStr(last(splitS("-.","723-825.13")))==="13","TEST[158] FAILED!");
assert(concatStr(head(splitS("-.","723-825.13")))==="723","TEST[159] FAILED!");
assert(concatStr((splitS("-.","723-825.13")[1]))==="825","TEST[160] FAILED!");

assert(lcmp([1,2,3],$_$(reverse,id)([1,2,3])),"TEST[161] FAILED!");
assert($$_(add(3),add,add(3),0)===6,"TEST[162] FAILED!");
assert(_$$(add,add,3,0)===6,"TEST[163] FAILED!");

assert(lcmp(rotate([1,2,3,4]),[4,1,2,3]),"TEST[164] FAILED!");

assert(count(2,[1,2,3,2,3])===2,"TEST[165] FAILED!");

assert(lcmp([1,2,3,4,5],merge([2,4],[1,3,5])),"TEST[166] FAILED!");

assert(last(insert(5,[1,2,3,4]))===5,"TEST[167] FAILED!");

var f = function(){return 5;};
var g = function(){return 6;};
assert(lcmp(map(call)([f,g]),[5,6]),"TEST[168] FAILED!");

assert(lcmp(subseq(1)(3,[1,2,3,4,5]),[2,3]),"TEST[169] FAILED!");

assert(true===false,"All tests done!");
