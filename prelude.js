/**
Copyright (c) 2011, Roman Muentener
All rights reserved.

Redistribution and use in source and binary forms, 
with or without modification, are permitted provided 
that the following conditions are met:

    * Redistributions of source code must retain the 
      above copyright notice, this list of conditions 
      and the following disclaimer.
    * Redistributions in binary form must reproduce 
      the above copyright notice, this list of conditions 
      and the following disclaimer in the documentation 
      and/or other materials provided with the distribution.
    * Neither the name of the <ORGANIZATION> nor the names of 
      its contributors may be used to endorse or promote products 
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE 
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
THE POSSIBILITY OF SUCH DAMAGE.
**/


/**
 * BEGIN MISC
 */


/**
 * id
 * The identity function
 * @return returns its argument
 */
function id(x) {
  if(x == undefined)
    return id;
  return x;
}

/**
 * const_
 * The constant function
 * @return returns always its second argument
 */
function const_(x,y) {
  if(x == undefined)
    return const_;
  if(y == undefined)
    return function(n){return x;}
  return x;
}

/**
 * compose
 * Function composition:
 *  compose(f,g)(x) = f(g(x))
 * @return a new function composed with the input functions
 */
function compose(x,y) {
  if(x == undefined)
    return compose;
  if(y == undefined)
    return function(n){return function(a){return x(n(a));};};
 return function(a){return x(y(a));};
}

/**
 * composeMultiple
 * Compose list of functions
 * @return a function
 */
function composeMultiple(l) {
  if(l == undefined)
    return composeMultiple;
  return foldl1(compose,l);
}

/**
 * fapp
 * Function application
 *  fapp(x,f) = f(x)
 */
function fapp(x,f) {
  if(x == undefined)
    return f;
  if(f == undefined)
    return function(n){return n(x);};
  return f(x);
}

/**
 * flip
 * Flips arguments before calling a given function
 *  flip(f,a,b) = f(b,a)
 */
function flip(f,a,b) {
  var doFlip = function(p,x,y) {
    return p(y,x);
  };

  if(f == undefined)
    return flip;
  if(a == undefined) {
    var t = function(n,m) {
      if(n == undefined)
        return t;
      if(m == undefined)
        return function(z){return doFlip(f,n,z);};
      return doFlip(f,n,m);
    };
    return t;
  }
  if(b == undefined)
    return function(z){return doFlip(f,a,z);};
  return doFlip(f,a,b);
}

/**
 * even
 * Returns true if x is a even number
 * @return bool
 */
function even(x) {
  if(x == undefined)
    return even;
  return (x%2)==0;
}

/**
 * odd
 * Returns true if x is an odd number
 * @return bool
 */
function odd(x) {
  if(x == undefined)
    return odd;
  return(x%2)==1;
}

/**
 * abs
 * Returns the absolute value
 * @return absolute value
 */
function abs(x) {
  if(x == undefined)
    return abs;
  if(x >=0)
    return x;
  return -x;
}

/**
 * max
 * Returns the greatest value
 * @return greatest value
 */
function max(x,y) {
  var doMax = function(x_,y_) {
    return x_ > y_ ? x_ : y_;
  };

  if(x == undefined)
    return max;
  if(y == undefined)
    return function(n){return doMax(x,n);};
  return doMax(x,y);
}

/**
 * min
 * Returns the smallest value
 * @return smallest value
 */
function min(x,y) {
  var doMin = function(x_,y_) {
    return x_ < y_ ? x_ : y_;
  };

  if(x == undefined)
    return min;
  if(y == undefined)
    return function(n){return doMin(x,n);};
  return doMin(x,y);
}

/**
 * gcd
 * Returns the greatest common divisor
 * @return gcd
 */
function gcd(a,b) {
  var doGcd = function(c,d) {
    var x = abs(c); var y = abs(d);
    if(y == 0)
      return x;
    if(x == 0)
      if(y == 0)
        return Infinity;
    return doGcd(y,x%y);
  };

  if(a == undefined)
    return gcd;
  if(b == undefined)
    return function(n){return doGcd(a,n);};
  return doGcd(a,b);
}

/**
 * lcm
 * Returns the least common multiple
 * @return lcm
 */
function lcm(a,b) {
  var doLcm = function(x,y) {
    if(x == 0) return 0;
    if(y == 0) return 0;
    return (a / (gcd(a,b)))*b;
  };

  if(a == undefined)
    return lcm;
  if(b == undefined)
    return function(n){return doLcm(a,n);};
  return doLcm(a,b);
}

/**
 * until
 * Perform f x until p
 */
function until(p,f,x) {
  var doUntil = function(p_,f_,x_) {
    if(p_(x_))
      return x_;
    return doUntil(p_,f_,f_(x_));
  };

  if(p == undefined)
    return until;
  if(f == undefined) {
    var t = function(n,m) {
      if(n == undefined)
        return t;
      if(m == undefined)
        return function(z){return doUntil(p,n,z);}
      return doUntil(p,n,m);
    };
    return t;
  }
  return doUntil(p,f,x);
}

/**
 * END MISC
 */

/**
 * BEGIN CHURCH PAIRS
 */

/**
 * pair
 * Creates a new church-encoded pair
 * @return a pair
 */
function pair(a,b) {
  var createPair = function(x,y) {
    return function(n){return n(x,y);};
  };
  if(a == undefined)
    return pair;
  if(b == undefined)
    return function(n){return createPair(a,n);}
  return createPair(a,b);
}

/**
 * fst
 * Returns the first element of a pair
 * @return 1st element of pair
 */
function fst(p) {
  if(p == undefined)
    return fst;
  return p(function(a,b){return a;});
}

/**
 * snd
 * Returns the second element of a pair
 * @return 2nd element of pair
 */
function snd(p) {
  if(p == undefined)
    return snd;
  return p(function(a,b){return b;});
}

/**
 * END CHURCH PAIRS
 */


/**
 * BEGIN ARITHMETIC
 */


/**
 * add
 * Performs an addition.
 * @return a+b
 */
function add(a,b) {
  if(a == undefined)
    return add;
  if(b == undefined)
    return function(n){return a+n;}
  return a+b;
}

/**
 * sub
 * Performs a subtraction
 * @return a-b
 */
function sub(a,b) {
  if(a == undefined)
    return sub;
  if(b == undefined)
    return function(n){return a-n;}
  return a-b;
}

/**
 * mul
 * Performs a multiplication
 * @return a*b
 */
function mul(a,b) {
  if(a == undefined)
    return mul;
  if(b == undefined)
    return function(n){return a*n;}
  return a*b;
}

/**
 * div
 * Performs a division
 * @return a/b
 */
function div(a,b) {
  if(a == undefined)
    return div;
  if(b == undefined)
    return function(n){return a/n;}
  return a/b;
}

/**
 * mod
 * Performs a modulo division
 * @return a%b
 */
function mod(a,b) {
  if(a == undefined)
    return mod;
  if(b == undefined)
    return function(n){return a%n;}
  return a%b;
}

/**
 * pow
 * POWER!
 * @ return Math.pow(a,b)
 */
function pow(a,b) {
  if(a == undefined)
    return pow;
  if(b == undefined)
    return function(n){return Math.pow(a,n);};
  return Math.pow(a,b);
}

/**
 * END ARITHMETIC
 */

/**
 * BEGIN LIST
 */

/**
 * head
 * Returns the first element of a list
 * @return element of list
 */
function head(l) {
  if(l == undefined)
    return head;
  return l[0];
}

/**
 * tail
 * Returns all elements but the first of a list
 * @return elements of list
 */
function tail(l) {
  if(l == undefined)
    return tail;
  var t = new Array();
  for(var i = 1; i < l.length; i++)
    t.push(l[i]);
  return t;
}

/**
 * reverse
 * Reverses a list
 * @return list
 */
function reverse(l) {
  if(l == undefined)
    return reverse;
  var t = new Array();
  for(var i = l.length-1; i >= 0; i--)
    t.push(l[i]);
  return t;
}

/**
 * map
 * Applies a function to each element in a list and 
 * collects the results in a list
 * @return list
 */
function map(f,l) {
  var doMap = function(p,x) {
    var t = new Array();
    for(var i = 0; i < x.length; i++)
      t.push(p(x[i]));
    return t;
  };

  if(f == undefined)
    return map;
  if(l == undefined)
    return function(n){return doMap(f,n);};
  return doMap(f,l);
}

/**
 * foldl
 * Performs a left fold with initial value = head(list)
 */
function foldl(f,s,l) {
  var doFoldl = function(p,i,x) {
    var r = i;
    for(var j = 0; j < x.length; j++)
      r = p(r,x[j]);
    return r;
  };

  if(f == undefined)
    return foldl;
  if(s == undefined) {
    var t = function(n,m) {
      if(n == undefined)
        return t;
      if(m == undefined)
        return function(z){return doFoldl(f,n,z);}
      return doFoldl(f,n,m);
    };
    return t;
  }
  if(l == undefined)
    return function(n){return doFoldl(f,s,n);}
  return doFoldl(f,s,l);
}

/**
 * foldl1
 * Performs a left fold with a given initial value
 */
function foldl1(f,l) {
  var doFoldl1 = function(p,x) {
    var r = x[0];
    for(var j = 1; j < x.length; j++)
      r = p(r,x[j]);
    return r;
  };

  if(f == undefined)
    return foldl1;
  if(l == undefined)
    return function(n){return doFoldl1(f,n);}
  return doFoldl1(f,l);
}

/**
 * foldr
 * Performs a right fold with initial value = head(list)
 */
function foldr(f,s,l) {
  var doFoldr = function(p,i,x) {
    var r = i;
    for(var j = x.length-1; j >= 0; j--)
      r = p(x[j],r);
    return r;
  };

  if(f == undefined)
    return foldr;
  if(s == undefined) {
    var t = function(n,m) {
      if(n == undefined)
        return t;
      if(m == undefined)
        return function(z){return doFoldr(f,n,z);}
      return doFoldr(f,n,m);
    };
    return t;
  }
  if(l == undefined)
    return function(n){return doFoldr(f,s,n);}
  return doFoldr(f,s,l);
}

/**
 * foldr1
 * Performs a right foldl with a givin initial value
 */
function foldr1(f,l) {
  var doFoldr1 = function(p,x) {
    var r = x[x.length-1];
    for(var j = x.length-2; j >= 0; j--)
      r = p(x[j],r);
    return r;
  };

  if(f == undefined)
    return foldr1;
  if(l == undefined)
    return function(n){return doFoldr1(f,n);}
  return doFoldr1(f,l);
}

/**
 * scanl
 * Like foldl, returns intermediate results and final result in a list
 */
function scanl(f,s,l) {
  var doScanl = function(p,i,x) {
    var r = i; var t = new Array();
    t.push(r);
    for(var j = 0; j < x.length; j++) {
      r = p(r,x[j]);
      t.push(r);
    }
    return t;
  };

  if(f == undefined)
    return scanl;
  if(s == undefined) {
    var t = function(n,m) {
      if(n == undefined)
        return t;
      if(m == undefined)
        return function(z){return doScanl(f,n,z);}
      return doScanl(f,n,m);
    };
    return t;
  }
  if(l == undefined)
    return function(n){return doScanl(f,s,n);}
  return doScanl(f,s,l);
}

/**
 * scanl1
 * Like foldl1, returns intermediate results and final result in a list
 */
function scanl1(f,l) {
  var doScanl1 = function(p,x) {
    var r = x[0]; var t = new Array();
    t.push(r);
    for(var j = 1; j < x.length; j++) {
      r = p(r,x[j]);
      t.push(r);
    }
    return t;
  };

  if(f == undefined)
    return scanl1;
  if(l == undefined)
    return function(n){return doScanl1(f,n);}
  return doScanl1(f,l);
}

/**
 * scanr
 * Like foldr, returns intermediate results and final result in a list
 */
function scanr(f,s,l) {
  var doScanr = function(p,i,x) {
    var r = i; var t = new Array();
    t.push(r);
    for(var j = x.length-1; j >= 0; j--) {
      r = p(x[j],r);
      t.push(r);
    }
    return reverse(t);
  };

  if(f == undefined)
    return scanr;
  if(s == undefined) {
    var t = function(n,m) {
      if(n == undefined)
        return t;
      if(m == undefined)
        return function(z){return doScanr(f,n,z);}
      return doScanr(f,n,m);
    };
    return t;
  }
  if(l == undefined)
    return function(n){return doScanr(f,s,n);}
  return doScanr(f,s,l);
}

/**
 * scanr1
 * Like foldr1, returns intermediate results and final result in a list
 */
function scanr1(f,l) {
  var doScanr1 = function(p,x) {
    var r = x[x.length-1]; var t = new Array();
    t.push(r);
    for(var j = x.length-2; j >= 0; j--) {
      r = p(x[j],r);
      t.push(r);
    }
    return reverse(t);
  };

  if(f == undefined)
    return scanr1;
  if(l == undefined)
    return function(n){return doScanr1(f,n);}
  return doScanr1(f,l);
}

/**
 * zip
 * Zips to lists together
 * @return list of pairs
 */
function zip(xs,ys) {
  var doZip = function(x,y) {
    var t = new Array();
    for(var i = 0; (i < x.length) && (i < y.length); i++) {
      t.push(pair(x[i],y[i]));
    }
    return t;
  };

  if(xs == undefined)
    return zip;
  if(ys == undefined)
    return function(n){return doZip(xs,n);}
  return doZip(xs,ys);
}

/**
 * unzip
 * unzips lists
 * @return pair of lists
 */
function unzip(l) {
  if(l == undefined)
    return unzip;

  return pair(map(fst,l),map(snd,l));
}

/**
 * zipWith
 * Same as zip, but does not use the pair function
 * Instead you can specify the function to use
 * @return list
 */
function zipWith(f,xs,ys) {
  var doZipWith = function(p,x,y) {
    var t = new Array();
    for(var i = 0; (i < x.length) && (i < y.length); i++) {
      t.push(p(x[i],y[i]));
    }
    return t;
  };

  if(f == undefined)
    return zipWith;
  if(xs == undefined) {
    var z = function(n,m) {
      if(n == undefined)
        return z;
      if(m == undefined)
        return function(q){return doZipWith(f,n,q);}
      return doZipWith(f,n,m);
    };
    return z;
  }
  if(ys == undefined)
    return function(n){return doZipWith(f,xs,n);}
  return doZipWith(f,xs,ys);
}

/**
 * length
 * Returns the length of a list
 * @return length
 */
function length(l) {
  if(l == undefined)
    return length;
  return l.length;
}

/**
 * last
 * Returns the last element of a list
 * @return element of list
 */
function last(l) {
  if(l == undefined)
    return last;
  return l[l.length-1];
}

/**
 * init
 * Returns all but the last element of a list
 * @return elements of list
 */
function init(l) {
  if(l == undefined)
    return init;
  var t = new Array();
  for(var i = 0; i < l.length-1; i++)
    t.push(l[i]);
  return t;
}

/**
 * filter
 * Returns only elements fulfilling a criteria
 * @return elements of list
 */
function filter(f,l) {
  var doFilter = function(p,x) {
    var t = new Array();
    for(var i = 0; i < x.length; i++)
      if(p(x[i]))
        t.push(x[i]);
    return t;
  };
  
  if(f == undefined)
    return filter;
  if(l == undefined)
    return function(n){return doFilter(f,n);};
  return doFilter(f,l);
}

/**
 * any
 * Returns true if any element of a list fulfills a criteria
 * @return bool
 */
function any(f,l) {
  var doAny = function(p,x) {
    for(var i = 0; i < x.length; i++)
      if(p(x[i]))
        return true;
    return false;
  };

  if(f == undefined)
    return any;
  if(l == undefined)
    return function(n){return doAny(f,n);};
  return doAny(f,l);
}

/**
 * all
 * Returns true if all elements of a list fulfills a criteria
 * @return bool
 */
function all(f,l) {
  if(f == undefined)
    return f;
  if(l == undefined)
    return compose(and,map(f));
  return and(map(f,l));
}

/**
 * range
 * Creates a number range
 * @return list
 */
function range(x,y) {
  var doRange = function(a,b) {
    var t = new Array();
    if(a > b) {
      for(;b<=a;a--)
        t.push(a);
    }
    else {
      for(;b>=a;a++)
        t.push(a);
    }
    return t;
  };

  if(x == undefined)
    return range;
  if(y == undefined)
    return function(n){return doRange(x,n);};
  return doRange(x,y);
}

/**
 * break_
 * Stops at the first occurence where p and breaks the list at that point
 * @return pair
 */
function break_(p,l) {
  var doBreak = function(f,x) {
    var a = new Array(); var b = new Array();
    var u = false;
    for(var i = 0; i < x.length; i++) {
      if(f(x[i]) == true)
        u = true;
      if(u == true)
        b.push(x[i]);
      else
        a.push(x[i]);
    }
    return pair(a,b);
  };
  if(p == undefined)
    return break_;
  if(l == undefined)
    return function(n){return doBreak(p,n);};
  return doBreak(p,l);
}

/**
 * sum
 * The sum of all elements in a list
 * @return sum
 */
function sum(l) {
  if(l == undefined)
    return sum;
  return foldl1(add,l);
}

/**
 * product
 * The product of all elements in a list
 * @return product
 */
function product(l) {
  if(l == undefined)
    return product;
  return foldl1(mul,l);
}


/**
 * ladd
 * Concatenate to lists
 * @return list
 */
function ladd(xs,ys) {
  var doLadd = function(xs,ys) {
    var t = new Array();
    for(var i= 0; i < xs.length; i++)
      t.push(xs[i]);
    for(var i = 0; i < ys.length; i++)
      t.push(ys[i]);
    return t;
  };

  if(xs == undefined)
    return ladd;
  if(ys == undefined)
    return function(n){return doLadd(xs,n);};
  return doLadd(xs,ys);
}

/**
 * replicate
 * Returns a list containing an element n-times
 */
function replicate(n,e) {
  var doReplicate = function(n_,e_) {
    var t = new Array();
    for(;n_>0;n_--)
      t.push(e_);
    return t;
  };

  if(n == undefined)
    return replicate;
  if(e == undefined)
    return function(z){return doReplicate(n,z);};
  return doReplicate(n,e);
}

/**
 * iterate
 * Call a function n-times
 */
function iterate(n,f) {
  var doIterate = function(n_,f_) {
    return composeMultiple(replicate(n_,f_));
  };

  if(n == undefined)
    return iterate;
  if(f == undefined)
    return function(z){return doIterate(n,z);};
  return doIterate(n,f);
}

/**
 * drop
 * Drop elements from list
 * @return list
 */
function drop(n,l) {
  var doDrop = function(n_,l_) {
    var t = new Array();
    for(;n_<l_.length;n_++)
      t.push(l_[n_]);
    return t;
  };

  if(n == undefined)
    return drop;
  if(l == undefined)
    return function(z){return doDrop(n,z);};
  return doDrop(n,l);
}

/**
 * take
 * take elements from list
 * @return list
 */
function take(n,l) {
  var doTake = function(n_,l_) {
    var t = new Array();
    for(var i = 0;(i<l_.length)&&(i<n_);i++)
      t.push(l_[i]);
    return t;
  };

  if(n == undefined)
    return take;
  if(l == undefined)
    return function(z){return doTake(n,z);};
  return doTake(n,l);
}

/**
 * dropWhile
 * Drops until not p
 * @return list
 */
function dropWhile(p,l) {
  var doDropWhile = function(p_,l_) {
    var u = true; var t = new Array();
    for(var i = 0; i < l_.length; i++) {
      if(u) {
       if(p_(l_[i]) == false) {
        u = false;
       }
      }
      if(u === false)
        t.push(l_[i]);
    }

    return t;
  };
  
  if(p == undefined)
    return dropWhile;
  if(l == undefined)
    return function(z){return doDropWhile(p,z);};
  return doDropWhile(p,l);
}

/**
 * takeWhile
 * Takes until not p
 * @return list
 */
function takeWhile(p,l) {
  var doTakeWhile = function(p_,l_) {
    var t = new Array();
    for(var i = 0; i < l_.length; i++) {
      if(p_(l_[i]) == false) {
        break;
      }
      t.push(l_[i]);
    }

    return t;
  };
  
  if(p == undefined)
    return takeWhile;
  if(l == undefined)
    return function(z){return doTakeWhile(p,z);};
  return doTakeWhile(p,l);
}

/**
 * concat
 * Flatten lists
 * @return list
 */
function concat(l) {
  if(l == undefined)
    return concat;
  return foldl(ladd,[],l);
}

/**
 * concatStr
 * Flatten lists
 * @return list
 */
function concatStr(l) {
  if(l == undefined)
    return concatStr;
  return foldl(add,"",l);
}

/**
 * concatMap
 * map with concat
 * @return list
 */
function concatMap(f,l) {
  if(f == undefined)
    return concatMap;
  if(l == undefined)
    return compose(concat,map(f));
  return concat(map(f,l));
}

/**
 * split
 * Split a string using a delimiter
 * @return list
 */
function split(s,d) {
  if(s == undefined)
    return split;
  if(d == undefined)
    return function(n){return s.split(n);};
  return s.split(d);
}

/**
 * words
 * Break a string into words
 * @return list
 */
function words(s) {
  if(s == undefined)
    return s;
  return split(s," ");
}

/**
 * unwords
 * Concatenate words
 * @return list
 */
function unwords(l) {
  if(l == undefined)
    return l;
  return concatStr(init(concatStr(map(flip(add," "),l))));
}

/**
 * lines
 * Breaks a string into lines
 * @return list
 */
function lines(s) {
  if(s == undefined)
    return lines;
  return split(s,"\n");
}

/**
 * unlines
 * Concatenate lines
 * @return list
 */
function unlines(l) {
  if(l == undefined)
    return unlines;
  return concatStr(init(concatStr(map(flip(add,"\n"),l))));
}

/**
 * elem
 * Check if e is an element of a list
 * @return bool
 */
function elem(e,l) {
  var doElem = function(e_,l_) {
    var cmp = function(n){return e_===n;};
    return any(cmp,l_);
  };

  if(e == undefined)
    return elem;
  if(l == undefined)
    return function(z){return doElem(e,z);};
  return doElem(e,l);
}

/**
 * elem
 * Check if e is an element of a list
 * @return bool
 */
function notElem(e,l) {
  var doNotElem = function(e_,l_) {
    var cmp = function(n){return e_!==n;};
    return all(cmp,l_);
  };

  if(e == undefined)
    return notElem;
  if(l == undefined)
    return function(z){return doNotElem(e,z);};
  return doNotElem(e,l);
}

/**
 * minimum
 * Returns the smallest element in a list
 * @return smallest element
 */
function minimum(l) {
  if(l == undefined)
    return minimum;
  return foldl1(min,l);
}

/**
 * maximum
 * Returns the biggest element in a list
 * @return biggest element
 */
function maximum(l) {
  if(l == undefined)
    return maximum;
  return foldl1(max,l);
}

/**
 * END LIST
 */

/**
 * BEGIN COMPARISION
 */

/**
 * toBool
 */
function toBool(x) {
  return x ? true : false;
}

/**
 * eq
 * EQual
 * @return x == y
 */
function eq(x,y) {
  if(x == undefined)
    return eq;
  if(y == undefined)
    return function(n){ return x == n; }
  return x == y;
}

/**
 * neq
 * Not EQual
 * @return x != y
 */
function neq(x,y) {
  if(x == undefined)
    return neq;
  if(y == undefined)
    return function(n){ return x != n; }
  return x != y;
}

/**
 * gt
 * Greater Than
 * @return x > y
 */
function gt(x,y) {
  if(x == undefined)
    return gt;
  if(y == undefined)
    return function(n){ return x > n; }
  return x > y;
}

/**
 * lt
 * Less Than
 * @return x < y
 */
function lt(x,y) {
  if(x == undefined)
    return lt;
  if(y == undefined)
    return function(n){ return x < n; }
  return x < y;
}

/**
 * geq
 * Greater Or EQual
 * @return x >= y
 */
function geq(x,y) {
  if(x == undefined)
    return geq;
  if(y == undefined)
    return function(n){ return x >= n; }
  return x >= y;
}

/**
 * leq
 * Less Or EQual
 * @return x <= y
 */
function leq(x,y) {
  if(x == undefined)
    return leq;
  if(y == undefined)
    return function(n){ return x <= n; }
  return x <= y;
}


/**
 * END COMPARISION
 */

/**
 * BEGIN LOGIC
 */

/**
 * or
 * Logical or
 * @return bool
 */
function or(l) {
  if(l == undefined)
    return or;
  for(var i = 0; i < l.length; i++)
    if(l[i])
      return true;
  return false;
}

/**
 * and
 * Logical and
 * @return bool
 */
function and(l) {
  if(l == undefined)
    return and;
  for(var i = 0; i < l.length; i++)
    if(l[i] == false)
      return false;
  return true;
}


/**
 * BEGIN MAYBE
 */

function Just(x) {
  if(x == undefined)
    return Just;

  var obj = { type : 'just', value : x };
  return obj;
}

function Nothing() {
  var obj = { type : 'nothing' };
  return obj;
}

/**
 * isJust
 * Returns true if (Just x)
 * @return bool
 */
function isJust(x) {
  if(x == undefined)
    return isJust;

  return x.type === 'just';
}

/**
 * isNothing
 * Returns true if (Nothing)
 * @return bool
 */
function isNothing(x) {
  if(x == undefined)
    return isNothing;

  return x.type === 'nothing';
}

/**
 * fromMaybe
 * Returns x if (Just x) a if (Nothing)
 */
function fromMaybe(a,m) {
  var doFromMaybe = function(a_,m_) {
    if(isJust(m_))
      return m_.value;
    return a_;
  };

  if(a == undefined)
    return fromMaybe;
  if(m == undefined)
    return function(n){return doFromMaybe(a,n);};
  return doFromMaybe(a,m);
}

/**
 * lookup
 * Dictionary-like lookup. (Expects a list of pairs)
 * @return Maybe
 */
function lookup(a,l) {
  var doLookup = function(a_,l_) {
    for(var i = 0; i < l_.length; i++)
      if(fst(l_[i]) == a_)
        return Just(snd(l_[i]));
     return Nothing();
  };

  if(a == undefined)
    return lookup;
  if(l == undefined)
    return function(n){return doLookup(a,n);};
  return doLookup(a,l);
}

/**
 * END MAYBE
 */

/**
 * BEGIN ALIASES
 */
$f = flip; $c = compose;
$m = map; $z = zip;
$a = fapp; $r = range;
$cm = composeMultiple;
/**
 * END ALIASES
 */
