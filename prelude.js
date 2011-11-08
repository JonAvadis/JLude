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


// ID
function id(x) {
  if(x == undefined)
    return id;
  return x;
}

// CONST_
function const_(x,y) {
  if(x == undefined)
    return const_;
  if(y == undefined)
    return function(n){return x;}
  return x;
}

// COMPOSE
function compose(x,y) {
  if(x == undefined)
    return compose;
  if(y == undefined)
    return function(n){return function(a){return x(n(a));};};
 return function(a){return x(y(a));};
}

// FAPP
function fapp(x,f) {
  if(x == undefined)
    return f;
  if(f == undefined)
    return function(n){return n(x);};
  return f(x);
}

/**
 * END MISC
 */

/**
 * BEGIN CHURCH PAIRS
 */

// PAIR
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

// FST
function fst(p) {
  if(p == undefined)
    return fst;
  return p(function(a,b){return a;});
}

// SND
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


// ADD
function add(a,b) {
  if(a == undefined)
    return add;
  if(b == undefined)
    return function(n){return a+n;}
  return a+b;
}

// SUB
function sub(a,b) {
  if(a == undefined)
    return sub;
  if(b == undefined)
    return function(n){return a-n;}
  return a-b;
}

// MUL
function mul(a,b) {
  if(a == undefined)
    return mul;
  if(b == undefined)
    return function(n){return a*n;}
  return a*b;
}

// DIV
function div(a,b) {
  if(a == undefined)
    return div;
  if(b == undefined)
    return function(n){return a/n;}
  return a/b;
}

// MOD
function mod(a,b) {
  if(a == undefined)
    return mod;
  if(b == undefined)
    return function(n){return a%n;}
  return a%b;
}

/**
 * END ARITHMETIC
 */

/**
 * BEGIN LIST
 */

// HEAD
function head(l) {
  if(l == undefined)
    return head;
  return l[0];
}

// TAIL
function tail(l) {
  if(l == undefined)
    return tail;
  var t = new Array();
  for(var i = 1; i < l.length; i++)
    t.push(l[i]);
  return t;
}

// REVERSE
function reverse(l) {
  if(l == undefined)
    return reverse;
  var t = new Array();
  for(var i = l.length-1; i >= 0; i--)
    t.push(l[i]);
  return t;
}

// MAP
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

// FOLDL
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

// FOLDL1
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

// FOLDR
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

// FOLDR1
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

// SCANL
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

// SCANL1
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

// SCANR
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

// SCANR1
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

// ZIP
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

// ZIPWITH
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

// LENGTH
function length(l) {
  if(l == undefined)
    return length;
  return l.length;
}

// LAST
function last(l) {
  if(l == undefined)
    return last;
  return l[l.length-1];
}

// INIT
function init(l) {
  if(l == undefined)
    return init;
  var t = new Array();
  for(var i = 0; i < l.length-1; i++)
    t.push(l[i]);
  return t;
}


/**
 * END LIST
 */
