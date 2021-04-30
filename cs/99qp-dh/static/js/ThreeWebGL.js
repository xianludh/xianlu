// ThreeWebGL.js r39 - http://github.com/mrdoob/three.js
var THREE = THREE || {};
if (!window.Int32Array) {
    window.Int32Array = Array;
    window.Float32Array = Array;
}
THREE.Color = function (b) {
    this.setHex(b);
};
THREE.Color.prototype = {
    autoUpdate: !0,
    copy: function (b) {
        this.r = b.r;
        this.g = b.g;
        this.b = b.b;
        this.hex = b.hex;
        this.__styleString = b.__styleString;
    },
    setRGB: function (b, d, e) {
        this.r = b;
        this.g = d;
        this.b = e;
        if (this.autoUpdate) {
            this.updateHex();
            this.updateStyleString();
        }
    },
    setHSV: function (b, d, e) {
        var g, h, o, n, p, q;
        if (e == 0) g = h = o = 0;
        else {
            n = Math.floor(b * 6);
            p = b * 6 - n;
            b = e * (1 - d);
            q = e * (1 - d * p);
            d = e * (1 - d * (1 - p));
            switch (n) {
                case 1:
                    g = q;
                    h = e;
                    o = b;
                    break;
                case 2:
                    g = b;
                    h = e;
                    o = d;
                    break;
                case 3:
                    g = b;
                    h = q;
                    o = e;
                    break;
                case 4:
                    g = d;
                    h = b;
                    o = e;
                    break;
                case 5:
                    g = e;
                    h = b;
                    o = q;
                    break;
                case 6:
                case 0:
                    g = e;
                    h = d;
                    o = b;
            }
        }
        this.r = g;
        this.g = h;
        this.b = o;
        if (this.autoUpdate) {
            this.updateHex();
            this.updateStyleString();
        }
    },
    setHex: function (b) {
        this.hex = ~~b & 16777215;
        if (this.autoUpdate) {
            this.updateRGB();
            this.updateStyleString();
        }
    },
    updateHex: function () {
        this.hex = (~~(this.r * 255) << 16) ^ (~~(this.g * 255) << 8) ^ ~~(this.b * 255);
    },
    updateRGB: function () {
        this.r = ((this.hex >> 16) & 255) / 255;
        this.g = ((this.hex >> 8) & 255) / 255;
        this.b = (this.hex & 255) / 255;
    },
    updateStyleString: function () {
        this.__styleString = 'rgb(' + ~~(this.r * 255) + ',' + ~~(this.g * 255) + ',' + ~~(this.b * 255) + ')';
    },
    clone: function () {
        return new THREE.Color(this.hex);
    }
};
THREE.Vector2 = function (b, d) {
    this.set(b || 0, d || 0);
};
THREE.Vector2.prototype = {
    set: function (b, d) {
        this.x = b;
        this.y = d;
        return this;
    },
    copy: function (b) {
        this.set(b.x, b.y);
        return this;
    },
    addSelf: function (b) {
        this.set(this.x + b.x, this.y + b.y);
        return this;
    },
    add: function (b, d) {
        this.set(b.x + d.x, b.y + d.y);
        return this;
    },
    subSelf: function (b) {
        this.set(this.x - b.x, this.y - b.y);
        return this;
    },
    sub: function (b, d) {
        this.set(b.x - d.x, b.y - d.y);
        return this;
    },
    multiplyScalar: function (b) {
        this.set(this.x * b, this.y * b);
        return this;
    },
    negate: function () {
        this.set(-this.x, -this.y);
        return this;
    },
    unit: function () {
        this.multiplyScalar(1 / this.length());
        return this;
    },
    length: function () {
        return Math.sqrt(this.lengthSq());
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y;
    },
    clone: function () {
        return new THREE.Vector2(this.x, this.y);
    }
};
THREE.Vector3 = function (b, d, e) {
    this.set(b || 0, d || 0, e || 0);
};
THREE.Vector3.prototype = {
    set: function (b, d, e) {
        this.x = b;
        this.y = d;
        this.z = e;
        return this;
    },
    copy: function (b) {
        this.set(b.x, b.y, b.z);
        return this;
    },
    add: function (b, d) {
        this.set(b.x + d.x, b.y + d.y, b.z + d.z);
        return this;
    },
    addSelf: function (b) {
        this.set(this.x + b.x, this.y + b.y, this.z + b.z);
        return this;
    },
    addScalar: function (b) {
        this.set(this.x + b, this.y + b, this.z + b);
        return this;
    },
    sub: function (b, d) {
        this.set(b.x - d.x, b.y - d.y, b.z - d.z);
        return this;
    },
    subSelf: function (b) {
        this.set(this.x - b.x, this.y - b.y, this.z - b.z);
        return this;
    },
    cross: function (b, d) {
        this.set(b.y * d.z - b.z * d.y, b.z * d.x - b.x * d.z, b.x * d.y - b.y * d.x);
        return this;
    },
    crossSelf: function (b) {
        var d = this.x,
            e = this.y,
            g = this.z;
        this.set(e * b.z - g * b.y, g * b.x - d * b.z, d * b.y - e * b.x);
        return this;
    },
    multiply: function (b, d) {
        this.set(b.x * d.x, b.y * d.y, b.z * d.z);
        return this;
    },
    multiplySelf: function (b) {
        this.set(this.x * b.x, this.y * b.y, this.z * b.z);
        return this;
    },
    multiplyScalar: function (b) {
        this.set(this.x * b, this.y * b, this.z * b);
        return this;
    },
    divideSelf: function (b) {
        this.set(this.x / b.x, this.y / b.y, this.z / b.z);
        return this;
    },
    divideScalar: function (b) {
        this.set(this.x / b, this.y / b, this.z / b);
        return this;
    },
    negate: function () {
        this.set(-this.x, -this.y, -this.z);
        return this;
    },
    dot: function (b) {
        return this.x * b.x + this.y * b.y + this.z * b.z;
    },
    distanceTo: function (b) {
        return Math.sqrt(this.distanceToSquared(b));
    },
    distanceToSquared: function (b) {
        var d = this.x - b.x,
            e = this.y - b.y;
        b = this.z - b.z;
        return d * d + e * e + b * b;
    },
    length: function () {
        return Math.sqrt(this.lengthSq());
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    },
    lengthManhattan: function () {
        return this.x + this.y + this.z;
    },
    normalize: function () {
        var b = this.length();
        b > 0 ? this.multiplyScalar(1 / b) : this.set(0, 0, 0);
        return this;
    },
    setPositionFromMatrix: function (b) {
        this.x = b.n14;
        this.y = b.n24;
        this.z = b.n34;
    },
    setRotationFromMatrix: function (b) {
        this.y = Math.asin(b.n13);
        var d = Math.cos(this.y);
        if (Math.abs(d) > 1.0e-5) {
            this.x = Math.atan2(-b.n23 / d, b.n33 / d);
            this.z = Math.atan2(-b.n13 / d, b.n11 / d);
        } else {
            this.x = 0;
            this.z = Math.atan2(b.n21, b.n22);
        }
    },
    setLength: function (b) {
        return this.normalize().multiplyScalar(b);
    },
    isZero: function () {
        return Math.abs(this.x) < 1.0e-4 && Math.abs(this.y) < 1.0e-4 && Math.abs(this.z) < 1.0e-4;
    },
    clone: function () {
        return new THREE.Vector3(this.x, this.y, this.z);
    }
};
THREE.Vector4 = function (b, d, e, g) {
    this.set(b || 0, d || 0, e || 0, g || 1);
};
THREE.Vector4.prototype = {
    set: function (b, d, e, g) {
        this.x = b;
        this.y = d;
        this.z = e;
        this.w = g;
        return this;
    },
    copy: function (b) {
        this.set(b.x, b.y, b.z, b.w || 1);
        return this;
    },
    add: function (b, d) {
        this.set(b.x + d.x, b.y + d.y, b.z + d.z, b.w + d.w);
        return this;
    },
    addSelf: function (b) {
        this.set(this.x + b.x, this.y + b.y, this.z + b.z, this.w + b.w);
        return this;
    },
    sub: function (b, d) {
        this.set(b.x - d.x, b.y - d.y, b.z - d.z, b.w - d.w);
        return this;
    },
    subSelf: function (b) {
        this.set(this.x - b.x, this.y - b.y, this.z - b.z, this.w - b.w);
        return this;
    },
    multiplyScalar: function (b) {
        this.set(this.x * b, this.y * b, this.z * b, this.w * b);
        return this;
    },
    divideScalar: function (b) {
        this.set(this.x / b, this.y / b, this.z / b, this.w / b);
        return this;
    },
    lerpSelf: function (b, d) {
        this.set(this.x + (b.x - this.x) * d, this.y + (b.y - this.y) * d, this.z + (b.z - this.z) * d, this.w + (b.w - this.w) * d);
    },
    clone: function () {
        return new THREE.Vector4(this.x, this.y, this.z, this.w);
    }
};
THREE.Ray = function (b, d) {
    this.origin = b || new THREE.Vector3();
    this.direction = d || new THREE.Vector3();
};
THREE.Ray.prototype = {
    intersectScene: function (b) {
        var d,
            e,
            g = b.objects,
            h = [];
        b = 0;
        for (d = g.length; b < d; b++) {
            e = g[b];
            e instanceof THREE.Mesh && (h = h.concat(this.intersectObject(e)));
        }
        h.sort(function (o, n) {
            return o.distance - n.distance;
        });
        return h;
    },
    intersectObject: function (b) {
        function d(V, L, sa, da) {
            da = da.clone().subSelf(L);
            sa = sa.clone().subSelf(L);
            var oa = V.clone().subSelf(L);
            V = da.dot(da);
            L = da.dot(sa);
            da = da.dot(oa);
            var Z = sa.dot(sa);
            sa = sa.dot(oa);
            oa = 1 / (V * Z - L * L);
            Z = (Z * da - L * sa) * oa;
            V = (V * sa - L * da) * oa;
            return Z > 0 && V > 0 && Z + V < 1;
        }
        var e,
            g,
            h,
            o,
            n,
            p,
            q,
            v,
            E,
            F,
            H,
            I = b.geometry,
            M = I.vertices,
            N = [];
        e = 0;
        for (g = I.faces.length; e < g; e++) {
            h = I.faces[e];
            F = this.origin.clone();
            H = this.direction.clone();
            q = b.matrixWorld;
            o = q.multiplyVector3(M[h.a].position.clone());
            n = q.multiplyVector3(M[h.b].position.clone());
            p = q.multiplyVector3(M[h.c].position.clone());
            q = h instanceof THREE.Face4 ? q.multiplyVector3(M[h.d].position.clone()) : null;
            v = b.matrixRotationWorld.multiplyVector3(h.normal.clone());
            E = H.dot(v);
            if (b.doubleSided || (b.flipSided ? E > 0 : E < 0)) {
                v = v.dot(new THREE.Vector3().sub(o, F)) / E;
                F = F.addSelf(H.multiplyScalar(v));
                if (h instanceof THREE.Face3) {
                    if (d(F, o, n, p)) {
                        h = { distance: this.origin.distanceTo(F), point: F, face: h, object: b };
                        N.push(h);
                    }
                } else if (h instanceof THREE.Face4 && (d(F, o, n, q) || d(F, n, p, q))) {
                    h = { distance: this.origin.distanceTo(F), point: F, face: h, object: b };
                    N.push(h);
                }
            }
        }
        return N;
    }
};
THREE.Rectangle = function () {
    function b() {
        o = g - d;
        n = h - e;
    }
    var d,
        e,
        g,
        h,
        o,
        n,
        p = !0;
    this.getX = function () {
        return d;
    };
    this.getY = function () {
        return e;
    };
    this.getWidth = function () {
        return o;
    };
    this.getHeight = function () {
        return n;
    };
    this.getLeft = function () {
        return d;
    };
    this.getTop = function () {
        return e;
    };
    this.getRight = function () {
        return g;
    };
    this.getBottom = function () {
        return h;
    };
    this.set = function (q, v, E, F) {
        p = !1;
        d = q;
        e = v;
        g = E;
        h = F;
        b();
    };
    this.addPoint = function (q, v) {
        if (p) {
            p = !1;
            d = q;
            e = v;
            g = q;
            h = v;
        } else {
            d = d < q ? d : q;
            e = e < v ? e : v;
            g = g > q ? g : q;
            h = h > v ? h : v;
        }
        b();
    };
    this.add3Points = function (q, v, E, F, H, I) {
        if (p) {
            p = !1;
            d = q < E ? (q < H ? q : H) : E < H ? E : H;
            e = v < F ? (v < I ? v : I) : F < I ? F : I;
            g = q > E ? (q > H ? q : H) : E > H ? E : H;
            h = v > F ? (v > I ? v : I) : F > I ? F : I;
        } else {
            d = q < E ? (q < H ? (q < d ? q : d) : H < d ? H : d) : E < H ? (E < d ? E : d) : H < d ? H : d;
            e = v < F ? (v < I ? (v < e ? v : e) : I < e ? I : e) : F < I ? (F < e ? F : e) : I < e ? I : e;
            g = q > E ? (q > H ? (q > g ? q : g) : H > g ? H : g) : E > H ? (E > g ? E : g) : H > g ? H : g;
            h = v > F ? (v > I ? (v > h ? v : h) : I > h ? I : h) : F > I ? (F > h ? F : h) : I > h ? I : h;
        }
        b();
    };
    this.addRectangle = function (q) {
        if (p) {
            p = !1;
            d = q.getLeft();
            e = q.getTop();
            g = q.getRight();
            h = q.getBottom();
        } else {
            d = d < q.getLeft() ? d : q.getLeft();
            e = e < q.getTop() ? e : q.getTop();
            g = g > q.getRight() ? g : q.getRight();
            h = h > q.getBottom() ? h : q.getBottom();
        }
        b();
    };
    this.inflate = function (q) {
        d -= q;
        e -= q;
        g += q;
        h += q;
        b();
    };
    this.minSelf = function (q) {
        d = d > q.getLeft() ? d : q.getLeft();
        e = e > q.getTop() ? e : q.getTop();
        g = g < q.getRight() ? g : q.getRight();
        h = h < q.getBottom() ? h : q.getBottom();
        b();
    };
    this.instersects = function (q) {
        return Math.min(g, q.getRight()) - Math.max(d, q.getLeft()) >= 0 && Math.min(h, q.getBottom()) - Math.max(e, q.getTop()) >= 0;
    };
    this.empty = function () {
        p = !0;
        h = g = e = d = 0;
        b();
    };
    this.isEmpty = function () {
        return p;
    };
};
THREE.Matrix3 = function () {
    this.m = [];
};
THREE.Matrix3.prototype = {
    transpose: function () {
        var b,
            d = this.m;
        b = d[1];
        d[1] = d[3];
        d[3] = b;
        b = d[2];
        d[2] = d[6];
        d[6] = b;
        b = d[5];
        d[5] = d[7];
        d[7] = b;
        return this;
    },
    transposeIntoArray: function (b) {
        var d = this.m;
        b[0] = d[0];
        b[1] = d[3];
        b[2] = d[6];
        b[3] = d[1];
        b[4] = d[4];
        b[5] = d[7];
        b[6] = d[2];
        b[7] = d[5];
        b[8] = d[8];
        return this;
    }
};
THREE.Matrix4 = function (b, d, e, g, h, o, n, p, q, v, E, F, H, I, M, N) {
    this.set(b || 1, d || 0, e || 0, g || 0, h || 0, o || 1, n || 0, p || 0, q || 0, v || 0, E || 1, F || 0, H || 0, I || 0, M || 0, N || 1);
    this.flat = Array(16);
    this.m33 = new THREE.Matrix3();
};
THREE.Matrix4.prototype = {
    set: function (b, d, e, g, h, o, n, p, q, v, E, F, H, I, M, N) {
        this.n11 = b;
        this.n12 = d;
        this.n13 = e;
        this.n14 = g;
        this.n21 = h;
        this.n22 = o;
        this.n23 = n;
        this.n24 = p;
        this.n31 = q;
        this.n32 = v;
        this.n33 = E;
        this.n34 = F;
        this.n41 = H;
        this.n42 = I;
        this.n43 = M;
        this.n44 = N;
        return this;
    },
    identity: function () {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    },
    copy: function (b) {
        this.set(b.n11, b.n12, b.n13, b.n14, b.n21, b.n22, b.n23, b.n24, b.n31, b.n32, b.n33, b.n34, b.n41, b.n42, b.n43, b.n44);
        return this;
    },
    lookAt: function (b, d, e) {
        var g = THREE.Matrix4.__v1,
            h = THREE.Matrix4.__v2,
            o = THREE.Matrix4.__v3;
        o.sub(b, d).normalize();
        if (o.length() === 0) o.z = 1;
        g.cross(e, o).normalize();
        if (g.length() === 0) {
            o.x += 1.0e-4;
            g.cross(e, o).normalize();
        }
        h.cross(o, g).normalize();
        this.n11 = g.x;
        this.n12 = h.x;
        this.n13 = o.x;
        this.n21 = g.y;
        this.n22 = h.y;
        this.n23 = o.y;
        this.n31 = g.z;
        this.n32 = h.z;
        this.n33 = o.z;
        return this;
    },
    multiplyVector3: function (b) {
        var d = b.x,
            e = b.y,
            g = b.z,
            h = 1 / (this.n41 * d + this.n42 * e + this.n43 * g + this.n44);
        b.x = (this.n11 * d + this.n12 * e + this.n13 * g + this.n14) * h;
        b.y = (this.n21 * d + this.n22 * e + this.n23 * g + this.n24) * h;
        b.z = (this.n31 * d + this.n32 * e + this.n33 * g + this.n34) * h;
        return b;
    },
    multiplyVector4: function (b) {
        var d = b.x,
            e = b.y,
            g = b.z,
            h = b.w;
        b.x = this.n11 * d + this.n12 * e + this.n13 * g + this.n14 * h;
        b.y = this.n21 * d + this.n22 * e + this.n23 * g + this.n24 * h;
        b.z = this.n31 * d + this.n32 * e + this.n33 * g + this.n34 * h;
        b.w = this.n41 * d + this.n42 * e + this.n43 * g + this.n44 * h;
        return b;
    },
    rotateAxis: function (b) {
        var d = b.x,
            e = b.y,
            g = b.z;
        b.x = d * this.n11 + e * this.n12 + g * this.n13;
        b.y = d * this.n21 + e * this.n22 + g * this.n23;
        b.z = d * this.n31 + e * this.n32 + g * this.n33;
        b.normalize();
        return b;
    },
    crossVector: function (b) {
        var d = new THREE.Vector4();
        d.x = this.n11 * b.x + this.n12 * b.y + this.n13 * b.z + this.n14 * b.w;
        d.y = this.n21 * b.x + this.n22 * b.y + this.n23 * b.z + this.n24 * b.w;
        d.z = this.n31 * b.x + this.n32 * b.y + this.n33 * b.z + this.n34 * b.w;
        d.w = b.w ? this.n41 * b.x + this.n42 * b.y + this.n43 * b.z + this.n44 * b.w : 1;
        return d;
    },
    multiply: function (b, d) {
        var e = b.n11,
            g = b.n12,
            h = b.n13,
            o = b.n14,
            n = b.n21,
            p = b.n22,
            q = b.n23,
            v = b.n24,
            E = b.n31,
            F = b.n32,
            H = b.n33,
            I = b.n34,
            M = b.n41,
            N = b.n42,
            V = b.n43,
            L = b.n44,
            sa = d.n11,
            da = d.n12,
            oa = d.n13,
            Z = d.n14,
            K = d.n21,
            Ia = d.n22,
            ca = d.n23,
            Ea = d.n24,
            fa = d.n31,
            c = d.n32,
            S = d.n33,
            pa = d.n34;
        this.n11 = e * sa + g * K + h * fa;
        this.n12 = e * da + g * Ia + h * c;
        this.n13 = e * oa + g * ca + h * S;
        this.n14 = e * Z + g * Ea + h * pa + o;
        this.n21 = n * sa + p * K + q * fa;
        this.n22 = n * da + p * Ia + q * c;
        this.n23 = n * oa + p * ca + q * S;
        this.n24 = n * Z + p * Ea + q * pa + v;
        this.n31 = E * sa + F * K + H * fa;
        this.n32 = E * da + F * Ia + H * c;
        this.n33 = E * oa + F * ca + H * S;
        this.n34 = E * Z + F * Ea + H * pa + I;
        this.n41 = M * sa + N * K + V * fa;
        this.n42 = M * da + N * Ia + V * c;
        this.n43 = M * oa + N * ca + V * S;
        this.n44 = M * Z + N * Ea + V * pa + L;
        return this;
    },
    multiplyToArray: function (b, d, e) {
        this.multiply(b, d);
        e[0] = this.n11;
        e[1] = this.n21;
        e[2] = this.n31;
        e[3] = this.n41;
        e[4] = this.n12;
        e[5] = this.n22;
        e[6] = this.n32;
        e[7] = this.n42;
        e[8] = this.n13;
        e[9] = this.n23;
        e[10] = this.n33;
        e[11] = this.n43;
        e[12] = this.n14;
        e[13] = this.n24;
        e[14] = this.n34;
        e[15] = this.n44;
        return this;
    },
    multiplySelf: function (b) {
        this.multiply(this, b);
        return this;
    },
    multiplyScalar: function (b) {
        this.n11 *= b;
        this.n12 *= b;
        this.n13 *= b;
        this.n14 *= b;
        this.n21 *= b;
        this.n22 *= b;
        this.n23 *= b;
        this.n24 *= b;
        this.n31 *= b;
        this.n32 *= b;
        this.n33 *= b;
        this.n34 *= b;
        this.n41 *= b;
        this.n42 *= b;
        this.n43 *= b;
        this.n44 *= b;
        return this;
    },
    determinant: function () {
        var b = this.n11,
            d = this.n12,
            e = this.n13,
            g = this.n14,
            h = this.n21,
            o = this.n22,
            n = this.n23,
            p = this.n24,
            q = this.n31,
            v = this.n32,
            E = this.n33,
            F = this.n34,
            H = this.n41,
            I = this.n42,
            M = this.n43,
            N = this.n44;
        return g * n * v * H - e * p * v * H - g * o * E * H + d * p * E * H + e * o * F * H - d * n * F * H - g * n * q * I + e * p * q * I + g * h * E * I - b * p * E * I - e * h * F * I + b * n * F * I + g * o * q * M - d * p * q * M - g * h * v * M + b * p * v * M + d * h * F * M - b * o * F * M - e * o * q * N + d * n * q * N + e * h * v * N - b * n * v * N - d * h * E * N + b * o * E * N;
    },
    transpose: function () {
        var b;
        b = this.n21;
        this.n21 = this.n12;
        this.n12 = b;
        b = this.n31;
        this.n31 = this.n13;
        this.n13 = b;
        b = this.n32;
        this.n32 = this.n23;
        this.n23 = b;
        b = this.n41;
        this.n41 = this.n14;
        this.n14 = b;
        b = this.n42;
        this.n42 = this.n24;
        this.n24 = b;
        b = this.n43;
        this.n43 = this.n34;
        this.n43 = b;
        return this;
    },
    clone: function () {
        var b = new THREE.Matrix4();
        b.n11 = this.n11;
        b.n12 = this.n12;
        b.n13 = this.n13;
        b.n14 = this.n14;
        b.n21 = this.n21;
        b.n22 = this.n22;
        b.n23 = this.n23;
        b.n24 = this.n24;
        b.n31 = this.n31;
        b.n32 = this.n32;
        b.n33 = this.n33;
        b.n34 = this.n34;
        b.n41 = this.n41;
        b.n42 = this.n42;
        b.n43 = this.n43;
        b.n44 = this.n44;
        return b;
    },
    flatten: function () {
        this.flat[0] = this.n11;
        this.flat[1] = this.n21;
        this.flat[2] = this.n31;
        this.flat[3] = this.n41;
        this.flat[4] = this.n12;
        this.flat[5] = this.n22;
        this.flat[6] = this.n32;
        this.flat[7] = this.n42;
        this.flat[8] = this.n13;
        this.flat[9] = this.n23;
        this.flat[10] = this.n33;
        this.flat[11] = this.n43;
        this.flat[12] = this.n14;
        this.flat[13] = this.n24;
        this.flat[14] = this.n34;
        this.flat[15] = this.n44;
        return this.flat;
    },
    flattenToArray: function (b) {
        b[0] = this.n11;
        b[1] = this.n21;
        b[2] = this.n31;
        b[3] = this.n41;
        b[4] = this.n12;
        b[5] = this.n22;
        b[6] = this.n32;
        b[7] = this.n42;
        b[8] = this.n13;
        b[9] = this.n23;
        b[10] = this.n33;
        b[11] = this.n43;
        b[12] = this.n14;
        b[13] = this.n24;
        b[14] = this.n34;
        b[15] = this.n44;
        return b;
    },
    flattenToArrayOffset: function (b, d) {
        b[d] = this.n11;
        b[d + 1] = this.n21;
        b[d + 2] = this.n31;
        b[d + 3] = this.n41;
        b[d + 4] = this.n12;
        b[d + 5] = this.n22;
        b[d + 6] = this.n32;
        b[d + 7] = this.n42;
        b[d + 8] = this.n13;
        b[d + 9] = this.n23;
        b[d + 10] = this.n33;
        b[d + 11] = this.n43;
        b[d + 12] = this.n14;
        b[d + 13] = this.n24;
        b[d + 14] = this.n34;
        b[d + 15] = this.n44;
        return b;
    },
    setTranslation: function (b, d, e) {
        this.set(1, 0, 0, b, 0, 1, 0, d, 0, 0, 1, e, 0, 0, 0, 1);
        return this;
    },
    setScale: function (b, d, e) {
        this.set(b, 0, 0, 0, 0, d, 0, 0, 0, 0, e, 0, 0, 0, 0, 1);
        return this;
    },
    setRotationX: function (b) {
        var d = Math.cos(b);
        b = Math.sin(b);
        this.set(1, 0, 0, 0, 0, d, -b, 0, 0, b, d, 0, 0, 0, 0, 1);
        return this;
    },
    setRotationY: function (b) {
        var d = Math.cos(b);
        b = Math.sin(b);
        this.set(d, 0, b, 0, 0, 1, 0, 0, -b, 0, d, 0, 0, 0, 0, 1);
        return this;
    },
    setRotationZ: function (b) {
        var d = Math.cos(b);
        b = Math.sin(b);
        this.set(d, -b, 0, 0, b, d, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    },
    setRotationAxis: function (b, d) {
        var e = Math.cos(d),
            g = Math.sin(d),
            h = 1 - e,
            o = b.x,
            n = b.y,
            p = b.z,
            q = h * o,
            v = h * n;
        this.set(q * o + e, q * n - g * p, q * p + g * n, 0, q * n + g * p, v * n + e, v * p - g * o, 0, q * p - g * n, v * p + g * o, h * p * p + e, 0, 0, 0, 0, 1);
        return this;
    },
    setPosition: function (b) {
        this.n14 = b.x;
        this.n24 = b.y;
        this.n34 = b.z;
        return this;
    },
    setRotationFromEuler: function (b) {
        var d = b.x,
            e = b.y,
            g = b.z;
        b = Math.cos(d);
        d = Math.sin(d);
        var h = Math.cos(e);
        e = Math.sin(e);
        var o = Math.cos(g);
        g = Math.sin(g);
        var n = b * e,
            p = d * e;
        this.n11 = h * o;
        this.n12 = -h * g;
        this.n13 = e;
        this.n21 = p * o + b * g;
        this.n22 = -p * g + b * o;
        this.n23 = -d * h;
        this.n31 = -n * o + d * g;
        this.n32 = n * g + d * o;
        this.n33 = b * h;
        return this;
    },
    setRotationFromQuaternion: function (b) {
        var d = b.x,
            e = b.y,
            g = b.z,
            h = b.w,
            o = d + d,
            n = e + e,
            p = g + g;
        b = d * o;
        var q = d * n;
        d *= p;
        var v = e * n;
        e *= p;
        g *= p;
        o *= h;
        n *= h;
        h *= p;
        this.n11 = 1 - (v + g);
        this.n12 = q - h;
        this.n13 = d + n;
        this.n21 = q + h;
        this.n22 = 1 - (b + g);
        this.n23 = e - o;
        this.n31 = d - n;
        this.n32 = e + o;
        this.n33 = 1 - (b + v);
        return this;
    },
    scale: function (b) {
        var d = b.x,
            e = b.y;
        b = b.z;
        this.n11 *= d;
        this.n12 *= e;
        this.n13 *= b;
        this.n21 *= d;
        this.n22 *= e;
        this.n23 *= b;
        this.n31 *= d;
        this.n32 *= e;
        this.n33 *= b;
        this.n41 *= d;
        this.n42 *= e;
        this.n43 *= b;
        return this;
    },
    extractPosition: function (b) {
        this.n14 = b.n14;
        this.n24 = b.n24;
        this.n34 = b.n34;
    },
    extractRotation: function (b, d) {
        var e = 1 / d.x,
            g = 1 / d.y,
            h = 1 / d.z;
        this.n11 = b.n11 * e;
        this.n21 = b.n21 * e;
        this.n31 = b.n31 * e;
        this.n12 = b.n12 * g;
        this.n22 = b.n22 * g;
        this.n32 = b.n32 * g;
        this.n13 = b.n13 * h;
        this.n23 = b.n23 * h;
        this.n33 = b.n33 * h;
    }
};
THREE.Matrix4.makeInvert = function (b, d) {
    var e = b.n11,
        g = b.n12,
        h = b.n13,
        o = b.n14,
        n = b.n21,
        p = b.n22,
        q = b.n23,
        v = b.n24,
        E = b.n31,
        F = b.n32,
        H = b.n33,
        I = b.n34,
        M = b.n41,
        N = b.n42,
        V = b.n43,
        L = b.n44;
    d === undefined && (d = new THREE.Matrix4());
    d.n11 = q * I * N - v * H * N + v * F * V - p * I * V - q * F * L + p * H * L;
    d.n12 = o * H * N - h * I * N - o * F * V + g * I * V + h * F * L - g * H * L;
    d.n13 = h * v * N - o * q * N + o * p * V - g * v * V - h * p * L + g * q * L;
    d.n14 = o * q * F - h * v * F - o * p * H + g * v * H + h * p * I - g * q * I;
    d.n21 = v * H * M - q * I * M - v * E * V + n * I * V + q * E * L - n * H * L;
    d.n22 = h * I * M - o * H * M + o * E * V - e * I * V - h * E * L + e * H * L;
    d.n23 = o * q * M - h * v * M - o * n * V + e * v * V + h * n * L - e * q * L;
    d.n24 = h * v * E - o * q * E + o * n * H - e * v * H - h * n * I + e * q * I;
    d.n31 = p * I * M - v * F * M + v * E * N - n * I * N - p * E * L + n * F * L;
    d.n32 = o * F * M - g * I * M - o * E * N + e * I * N + g * E * L - e * F * L;
    d.n33 = h * v * M - o * p * M + o * n * N - e * v * N - g * n * L + e * p * L;
    d.n34 = o * p * E - g * v * E - o * n * F + e * v * F + g * n * I - e * p * I;
    d.n41 = q * F * M - p * H * M - q * E * N + n * H * N + p * E * V - n * F * V;
    d.n42 = g * H * M - h * F * M + h * E * N - e * H * N - g * E * V + e * F * V;
    d.n43 = h * p * M - g * q * M - h * n * N + e * q * N + g * n * V - e * p * V;
    d.n44 = g * q * E - h * p * E + h * n * F - e * q * F - g * n * H + e * p * H;
    d.multiplyScalar(1 / b.determinant());
    return d;
};
THREE.Matrix4.makeInvert3x3 = function (b) {
    var d = b.m33,
        e = d.m,
        g = b.n33 * b.n22 - b.n32 * b.n23,
        h = -b.n33 * b.n21 + b.n31 * b.n23,
        o = b.n32 * b.n21 - b.n31 * b.n22,
        n = -b.n33 * b.n12 + b.n32 * b.n13,
        p = b.n33 * b.n11 - b.n31 * b.n13,
        q = -b.n32 * b.n11 + b.n31 * b.n12,
        v = b.n23 * b.n12 - b.n22 * b.n13,
        E = -b.n23 * b.n11 + b.n21 * b.n13,
        F = b.n22 * b.n11 - b.n21 * b.n12;
    b = b.n11 * g + b.n21 * n + b.n31 * v;
    if (b == 0) throw 'matrix not invertible';
    b = 1 / b;
    e[0] = b * g;
    e[1] = b * h;
    e[2] = b * o;
    e[3] = b * n;
    e[4] = b * p;
    e[5] = b * q;
    e[6] = b * v;
    e[7] = b * E;
    e[8] = b * F;
    return d;
};
THREE.Matrix4.makeFrustum = function (b, d, e, g, h, o) {
    var n;
    n = new THREE.Matrix4();
    n.n11 = (2 * h) / (d - b);
    n.n12 = 0;
    n.n13 = (d + b) / (d - b);
    n.n14 = 0;
    n.n21 = 0;
    n.n22 = (2 * h) / (g - e);
    n.n23 = (g + e) / (g - e);
    n.n24 = 0;
    n.n31 = 0;
    n.n32 = 0;
    n.n33 = -(o + h) / (o - h);
    n.n34 = (-2 * o * h) / (o - h);
    n.n41 = 0;
    n.n42 = 0;
    n.n43 = -1;
    n.n44 = 0;
    return n;
};
THREE.Matrix4.makePerspective = function (b, d, e, g) {
    var h;
    b = e * Math.tan((b * Math.PI) / 360);
    h = -b;
    return THREE.Matrix4.makeFrustum(h * d, b * d, h, b, e, g);
};
THREE.Matrix4.makeOrtho = function (b, d, e, g, h, o) {
    var n, p, q, v;
    n = new THREE.Matrix4();
    p = d - b;
    q = e - g;
    v = o - h;
    n.n11 = 2 / p;
    n.n12 = 0;
    n.n13 = 0;
    n.n14 = -((d + b) / p);
    n.n21 = 0;
    n.n22 = 2 / q;
    n.n23 = 0;
    n.n24 = -((e + g) / q);
    n.n31 = 0;
    n.n32 = 0;
    n.n33 = -2 / v;
    n.n34 = -((o + h) / v);
    n.n41 = 0;
    n.n42 = 0;
    n.n43 = 0;
    n.n44 = 1;
    return n;
};
THREE.Matrix4.__v1 = new THREE.Vector3();
THREE.Matrix4.__v2 = new THREE.Vector3();
THREE.Matrix4.__v3 = new THREE.Vector3();
THREE.Object3D = function () {
    this.parent = undefined;
    this.children = [];
    this.up = new THREE.Vector3(0, 1, 0);
    this.position = new THREE.Vector3();
    this.rotation = new THREE.Vector3();
    this.scale = new THREE.Vector3(1, 1, 1);
    this.rotationAutoUpdate = !0;
    this.matrix = new THREE.Matrix4();
    this.matrixWorld = new THREE.Matrix4();
    this.matrixRotationWorld = new THREE.Matrix4();
    this.matrixAutoUpdate = !0;
    this.matrixWorldNeedsUpdate = !0;
    this.quaternion = new THREE.Quaternion();
    this.useQuaternion = !1;
    this.boundRadius = 0;
    this.boundRadiusScale = 1;
    this.visible = !0;
    this._vector = new THREE.Vector3();
};
THREE.Object3D.prototype = {
    translate: function (b, d) {
        this.matrix.rotateAxis(d);
        this.position.addSelf(d.multiplyScalar(b));
    },
    translateX: function (b) {
        this.translate(b, this._vector.set(1, 0, 0));
    },
    translateY: function (b) {
        this.translate(b, this._vector.set(0, 1, 0));
    },
    translateZ: function (b) {
        this.translate(b, this._vector.set(0, 0, 1));
    },
    lookAt: function (b) {
        this.matrix.lookAt(this.position, b, this.up);
        this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix);
    },
    addChild: function (b) {
        if (this.children.indexOf(b) === -1) {
            b.parent !== undefined && b.parent.removeChild(b);
            b.parent = this;
            this.children.push(b);
            for (var d = this; d instanceof THREE.Scene === !1 && d !== undefined; ) d = d.parent;
            d !== undefined && d.addChildRecurse(b);
        }
    },
    removeChild: function (b) {
        var d = this.children.indexOf(b);
        if (d !== -1) {
            b.parent = undefined;
            this.children.splice(d, 1);
        }
    },
    updateMatrix: function () {
        this.matrix.setPosition(this.position);
        this.useQuaternion ? this.matrix.setRotationFromQuaternion(this.quaternion) : this.matrix.setRotationFromEuler(this.rotation);
        if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1) {
            this.matrix.scale(this.scale);
            this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z));
        }
        this.matrixWorldNeedsUpdate = !0;
    },
    update: function (b, d, e) {
        this.matrixAutoUpdate && this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || d) {
            b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
            this.matrixRotationWorld.extractRotation(this.matrixWorld, this.scale);
            this.matrixWorldNeedsUpdate = !1;
            d = !0;
        }
        b = 0;
        for (var g = this.children.length; b < g; b++) this.children[b].update(this.matrixWorld, d, e);
    }
};
THREE.Quaternion = function (b, d, e, g) {
    this.set(b || 0, d || 0, e || 0, g !== undefined ? g : 1);
};
THREE.Quaternion.prototype = {
    set: function (b, d, e, g) {
        this.x = b;
        this.y = d;
        this.z = e;
        this.w = g;
        return this;
    },
    setFromEuler: function (b) {
        var d = (0.5 * Math.PI) / 360,
            e = b.x * d,
            g = b.y * d,
            h = b.z * d;
        b = Math.cos(g);
        g = Math.sin(g);
        d = Math.cos(-h);
        h = Math.sin(-h);
        var o = Math.cos(e);
        e = Math.sin(e);
        var n = b * d,
            p = g * h;
        this.w = n * o - p * e;
        this.x = n * e + p * o;
        this.y = g * d * o + b * h * e;
        this.z = b * h * o - g * d * e;
        return this;
    },
    calculateW: function () {
        this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z));
        return this;
    },
    inverse: function () {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this;
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    },
    normalize: function () {
        var b = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        if (b == 0) this.w = this.z = this.y = this.x = 0;
        else {
            b = 1 / b;
            this.x *= b;
            this.y *= b;
            this.z *= b;
            this.w *= b;
        }
        return this;
    },
    multiplySelf: function (b) {
        var d = this.x,
            e = this.y,
            g = this.z,
            h = this.w,
            o = b.x,
            n = b.y,
            p = b.z;
        b = b.w;
        this.x = d * b + h * o + e * p - g * n;
        this.y = e * b + h * n + g * o - d * p;
        this.z = g * b + h * p + d * n - e * o;
        this.w = h * b - d * o - e * n - g * p;
        return this;
    },
    multiplyVector3: function (b, d) {
        d || (d = b);
        var e = b.x,
            g = b.y,
            h = b.z,
            o = this.x,
            n = this.y,
            p = this.z,
            q = this.w,
            v = q * e + n * h - p * g,
            E = q * g + p * e - o * h,
            F = q * h + o * g - n * e;
        e = -o * e - n * g - p * h;
        d.x = v * q + e * -o + E * -p - F * -n;
        d.y = E * q + e * -n + F * -o - v * -p;
        d.z = F * q + e * -p + v * -n - E * -o;
        return d;
    }
};
THREE.Quaternion.slerp = function (b, d, e, g) {
    var h = b.w * d.w + b.x * d.x + b.y * d.y + b.z * d.z;
    if (Math.abs(h) >= 1) {
        e.w = b.w;
        e.x = b.x;
        e.y = b.y;
        e.z = b.z;
        return e;
    }
    var o = Math.acos(h),
        n = Math.sqrt(1 - h * h);
    if (Math.abs(n) < 0.001) {
        e.w = 0.5 * (b.w + d.w);
        e.x = 0.5 * (b.x + d.x);
        e.y = 0.5 * (b.y + d.y);
        e.z = 0.5 * (b.z + d.z);
        return e;
    }
    h = Math.sin((1 - g) * o) / n;
    g = Math.sin(g * o) / n;
    e.w = b.w * h + d.w * g;
    e.x = b.x * h + d.x * g;
    e.y = b.y * h + d.y * g;
    e.z = b.z * h + d.z * g;
    return e;
};
THREE.Vertex = function (b) {
    this.position = b || new THREE.Vector3();
};
THREE.Face3 = function (b, d, e, g, h, o) {
    this.a = b;
    this.b = d;
    this.c = e;
    this.normal = g instanceof THREE.Vector3 ? g : new THREE.Vector3();
    this.vertexNormals = g instanceof Array ? g : [];
    this.color = h instanceof THREE.Color ? h : new THREE.Color();
    this.vertexColors = h instanceof Array ? h : [];
    this.vertexTangents = [];
    this.materials = o instanceof Array ? o : [o];
    this.centroid = new THREE.Vector3();
};
THREE.Face4 = function (b, d, e, g, h, o, n) {
    this.a = b;
    this.b = d;
    this.c = e;
    this.d = g;
    this.normal = h instanceof THREE.Vector3 ? h : new THREE.Vector3();
    this.vertexNormals = h instanceof Array ? h : [];
    this.color = o instanceof THREE.Color ? o : new THREE.Color();
    this.vertexColors = o instanceof Array ? o : [];
    this.vertexTangents = [];
    this.materials = n instanceof Array ? n : [n];
    this.centroid = new THREE.Vector3();
};
THREE.UV = function (b, d) {
    this.set(b || 0, d || 0);
};
THREE.UV.prototype = {
    set: function (b, d) {
        this.u = b;
        this.v = d;
        return this;
    },
    copy: function (b) {
        this.set(b.u, b.v);
        return this;
    }
};
THREE.Geometry = function () {
    this.id = 'Geometry' + THREE.GeometryIdCounter++;
    this.vertices = [];
    this.colors = [];
    this.faces = [];
    this.edges = [];
    this.faceUvs = [[]];
    this.faceVertexUvs = [[]];
    this.morphTargets = [];
    this.morphColors = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.boundingSphere = this.boundingBox = null;
    this.hasTangents = !1;
};
THREE.Geometry.prototype = {
    computeCentroids: function () {
        var b, d, e;
        b = 0;
        for (d = this.faces.length; b < d; b++) {
            e = this.faces[b];
            e.centroid.set(0, 0, 0);
            if (e instanceof THREE.Face3) {
                e.centroid.addSelf(this.vertices[e.a].position);
                e.centroid.addSelf(this.vertices[e.b].position);
                e.centroid.addSelf(this.vertices[e.c].position);
                e.centroid.divideScalar(3);
            } else if (e instanceof THREE.Face4) {
                e.centroid.addSelf(this.vertices[e.a].position);
                e.centroid.addSelf(this.vertices[e.b].position);
                e.centroid.addSelf(this.vertices[e.c].position);
                e.centroid.addSelf(this.vertices[e.d].position);
                e.centroid.divideScalar(4);
            }
        }
    },
    computeFaceNormals: function (b) {
        var d,
            e,
            g,
            h,
            o,
            n,
            p = new THREE.Vector3(),
            q = new THREE.Vector3();
        g = 0;
        for (h = this.faces.length; g < h; g++) {
            o = this.faces[g];
            if (b && o.vertexNormals.length) {
                p.set(0, 0, 0);
                d = 0;
                for (e = o.vertexNormals.length; d < e; d++) p.addSelf(o.vertexNormals[d]);
                p.divideScalar(3);
            } else {
                d = this.vertices[o.a];
                e = this.vertices[o.b];
                n = this.vertices[o.c];
                p.sub(n.position, e.position);
                q.sub(d.position, e.position);
                p.crossSelf(q);
            }
            p.isZero() || p.normalize();
            o.normal.copy(p);
        }
    },
    computeVertexNormals: function () {
        var b, d, e, g;
        if (this.__tmpVertices == undefined) {
            g = this.__tmpVertices = Array(this.vertices.length);
            b = 0;
            for (d = this.vertices.length; b < d; b++) g[b] = new THREE.Vector3();
            b = 0;
            for (d = this.faces.length; b < d; b++) {
                e = this.faces[b];
                if (e instanceof THREE.Face3) e.vertexNormals = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
                else if (e instanceof THREE.Face4) e.vertexNormals = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
            }
        } else {
            g = this.__tmpVertices;
            b = 0;
            for (d = this.vertices.length; b < d; b++) g[b].set(0, 0, 0);
        }
        b = 0;
        for (d = this.faces.length; b < d; b++) {
            e = this.faces[b];
            if (e instanceof THREE.Face3) {
                g[e.a].addSelf(e.normal);
                g[e.b].addSelf(e.normal);
                g[e.c].addSelf(e.normal);
            } else if (e instanceof THREE.Face4) {
                g[e.a].addSelf(e.normal);
                g[e.b].addSelf(e.normal);
                g[e.c].addSelf(e.normal);
                g[e.d].addSelf(e.normal);
            }
        }
        b = 0;
        for (d = this.vertices.length; b < d; b++) g[b].normalize();
        b = 0;
        for (d = this.faces.length; b < d; b++) {
            e = this.faces[b];
            if (e instanceof THREE.Face3) {
                e.vertexNormals[0].copy(g[e.a]);
                e.vertexNormals[1].copy(g[e.b]);
                e.vertexNormals[2].copy(g[e.c]);
            } else if (e instanceof THREE.Face4) {
                e.vertexNormals[0].copy(g[e.a]);
                e.vertexNormals[1].copy(g[e.b]);
                e.vertexNormals[2].copy(g[e.c]);
                e.vertexNormals[3].copy(g[e.d]);
            }
        }
    },
    computeTangents: function () {
        function b(aa, ma, na, ga, Y, wa, qa) {
            p = aa.vertices[ma].position;
            q = aa.vertices[na].position;
            v = aa.vertices[ga].position;
            E = n[Y];
            F = n[wa];
            H = n[qa];
            I = q.x - p.x;
            M = v.x - p.x;
            N = q.y - p.y;
            V = v.y - p.y;
            L = q.z - p.z;
            sa = v.z - p.z;
            da = F.u - E.u;
            oa = H.u - E.u;
            Z = F.v - E.v;
            K = H.v - E.v;
            Ia = 1 / (da * K - oa * Z);
            c.set((K * I - Z * M) * Ia, (K * N - Z * V) * Ia, (K * L - Z * sa) * Ia);
            S.set((da * M - oa * I) * Ia, (da * V - oa * N) * Ia, (da * sa - oa * L) * Ia);
            Ea[ma].addSelf(c);
            Ea[na].addSelf(c);
            Ea[ga].addSelf(c);
            fa[ma].addSelf(S);
            fa[na].addSelf(S);
            fa[ga].addSelf(S);
        }
        var d,
            e,
            g,
            h,
            o,
            n,
            p,
            q,
            v,
            E,
            F,
            H,
            I,
            M,
            N,
            V,
            L,
            sa,
            da,
            oa,
            Z,
            K,
            Ia,
            ca,
            Ea = [],
            fa = [],
            c = new THREE.Vector3(),
            S = new THREE.Vector3(),
            pa = new THREE.Vector3(),
            ra = new THREE.Vector3(),
            Fa = new THREE.Vector3();
        d = 0;
        for (e = this.vertices.length; d < e; d++) {
            Ea[d] = new THREE.Vector3();
            fa[d] = new THREE.Vector3();
        }
        d = 0;
        for (e = this.faces.length; d < e; d++) {
            o = this.faces[d];
            n = this.faceVertexUvs[0][d];
            if (o instanceof THREE.Face3) b(this, o.a, o.b, o.c, 0, 1, 2);
            else if (o instanceof THREE.Face4) {
                b(this, o.a, o.b, o.c, 0, 1, 2);
                b(this, o.a, o.b, o.d, 0, 1, 3);
            }
        }
        var ta = ['a', 'b', 'c', 'd'];
        d = 0;
        for (e = this.faces.length; d < e; d++) {
            o = this.faces[d];
            for (g = 0; g < o.vertexNormals.length; g++) {
                Fa.copy(o.vertexNormals[g]);
                h = o[ta[g]];
                ca = Ea[h];
                pa.copy(ca);
                pa.subSelf(Fa.multiplyScalar(Fa.dot(ca))).normalize();
                ra.cross(o.vertexNormals[g], ca);
                h = ra.dot(fa[h]);
                h = h < 0 ? -1 : 1;
                o.vertexTangents[g] = new THREE.Vector4(pa.x, pa.y, pa.z, h);
            }
        }
        this.hasTangents = !0;
    },
    computeBoundingBox: function () {
        var b;
        if (this.vertices.length > 0) {
            this.boundingBox = { x: [this.vertices[0].position.x, this.vertices[0].position.x], y: [this.vertices[0].position.y, this.vertices[0].position.y], z: [this.vertices[0].position.z, this.vertices[0].position.z] };
            for (var d = 1, e = this.vertices.length; d < e; d++) {
                b = this.vertices[d];
                if (b.position.x < this.boundingBox.x[0]) this.boundingBox.x[0] = b.position.x;
                else if (b.position.x > this.boundingBox.x[1]) this.boundingBox.x[1] = b.position.x;
                if (b.position.y < this.boundingBox.y[0]) this.boundingBox.y[0] = b.position.y;
                else if (b.position.y > this.boundingBox.y[1]) this.boundingBox.y[1] = b.position.y;
                if (b.position.z < this.boundingBox.z[0]) this.boundingBox.z[0] = b.position.z;
                else if (b.position.z > this.boundingBox.z[1]) this.boundingBox.z[1] = b.position.z;
            }
        }
    },
    computeBoundingSphere: function () {
        for (var b = this.boundingSphere === null ? 0 : this.boundingSphere.radius, d = 0, e = this.vertices.length; d < e; d++) b = Math.max(b, this.vertices[d].position.length());
        this.boundingSphere = { radius: b };
    },
    computeEdgeFaces: function () {
        function b(q, v) {
            return Math.min(q, v) + '_' + Math.max(q, v);
        }
        function d(q, v, E) {
            if (q[v] === undefined) {
                q[v] = { set: {}, array: [] };
                q[v].set[E] = 1;
                q[v].array.push(E);
            } else if (q[v].set[E] === undefined) {
                q[v].set[E] = 1;
                q[v].array.push(E);
            }
        }
        var e,
            g,
            h,
            o,
            n,
            p = {};
        e = 0;
        for (g = this.faces.length; e < g; e++) {
            n = this.faces[e];
            if (n instanceof THREE.Face3) {
                h = b(n.a, n.b);
                d(p, h, e);
                h = b(n.b, n.c);
                d(p, h, e);
                h = b(n.a, n.c);
                d(p, h, e);
            } else if (n instanceof THREE.Face4) {
                h = b(n.b, n.d);
                d(p, h, e);
                h = b(n.a, n.b);
                d(p, h, e);
                h = b(n.a, n.d);
                d(p, h, e);
                h = b(n.b, n.c);
                d(p, h, e);
                h = b(n.c, n.d);
                d(p, h, e);
            }
        }
        e = 0;
        for (g = this.edges.length; e < g; e++) {
            n = this.edges[e];
            h = n.vertexIndices[0];
            o = n.vertexIndices[1];
            n.faceIndices = p[b(h, o)].array;
            for (h = 0; h < n.faceIndices.length; h++) {
                o = n.faceIndices[h];
                n.faces.push(this.faces[o]);
            }
        }
    }
};
THREE.GeometryIdCounter = 0;
THREE.Camera = function (b, d, e, g, h) {
    THREE.Object3D.call(this);
    this.fov = b || 50;
    this.aspect = d || 1;
    this.near = e || 0.1;
    this.far = g || 2e3;
    this.target = h || new THREE.Object3D();
    this.useTarget = !0;
    this.matrixWorldInverse = new THREE.Matrix4();
    this.projectionMatrix = null;
    this.updateProjectionMatrix();
};
THREE.Camera.prototype = new THREE.Object3D();
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.supr = THREE.Object3D.prototype;
THREE.Camera.prototype.translate = function (b, d) {
    this.matrix.rotateAxis(d);
    this.position.addSelf(d.multiplyScalar(b));
    this.target.position.addSelf(d.multiplyScalar(b));
};
THREE.Camera.prototype.updateProjectionMatrix = function () {
    this.projectionMatrix = THREE.Matrix4.makePerspective(this.fov, this.aspect, this.near, this.far);
};
THREE.Camera.prototype.updateMatrix = function () {
    this.update(undefined, !0);
};
THREE.Camera.prototype.update = function (b, d, e) {
    if (this.useTarget) {
        this.matrix.lookAt(this.position, this.target.position, this.up);
        this.matrix.setPosition(this.position);
        b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
        THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
        d = !0;
    } else if (d || this.matrixWorldNeedsUpdate) {
        b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
        this.matrixWorldNeedsUpdate = !1;
        d = !0;
        THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
    }
    for (b = 0; b < this.children.length; b++) this.children[b].update(this.matrixWorld, d, e);
};
THREE.Light = function (b) {
    THREE.Object3D.call(this);
    this.color = new THREE.Color(b);
};
THREE.Light.prototype = new THREE.Object3D();
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.supr = THREE.Object3D.prototype;
THREE.AmbientLight = function (b) {
    THREE.Light.call(this, b);
};
THREE.AmbientLight.prototype = new THREE.Light();
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.DirectionalLight = function (b, d, e) {
    THREE.Light.call(this, b);
    this.position = new THREE.Vector3(0, 1, 0);
    this.intensity = d || 1;
    this.distance = e || 0;
};
THREE.DirectionalLight.prototype = new THREE.Light();
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.PointLight = function (b, d, e) {
    THREE.Light.call(this, b);
    this.position = new THREE.Vector3();
    this.intensity = d || 1;
    this.distance = e || 0;
};
THREE.PointLight.prototype = new THREE.Light();
THREE.PointLight.prototype.constructor = THREE.PointLight;
THREE.LensFlare = function (b, d, e, g) {
    THREE.Object3D.call(this);
    this.positionScreen = new THREE.Vector3();
    this.lensFlares = [];
    this.customUpdateCallback = undefined;
    b !== undefined && this.add(b, d, e, g);
};
THREE.LensFlare.prototype = new THREE.Object3D();
THREE.LensFlare.prototype.constructor = THREE.LensFlare;
THREE.LensFlare.prototype.supr = THREE.Object3D.prototype;
THREE.LensFlare.prototype.add = function (b, d, e, g) {
    d === undefined && (d = -1);
    e === undefined && (e = 0);
    if (g === undefined) g = THREE.BillboardBlending;
    e = Math.min(e, Math.max(0, e));
    this.lensFlares.push({ texture: b, size: d, distance: e, x: 0, y: 0, z: 0, scale: 1, rotation: 1, opacity: 1, blending: g });
};
THREE.LensFlare.prototype.updateLensFlares = function () {
    var b,
        d = this.lensFlares.length,
        e,
        g = -this.positionScreen.x * 2,
        h = -this.positionScreen.y * 2;
    for (b = 0; b < d; b++) {
        e = this.lensFlares[b];
        e.x = this.positionScreen.x + g * e.distance;
        e.y = this.positionScreen.y + h * e.distance;
        e.wantedRotation = e.x * Math.PI * 0.25;
        e.rotation += (e.wantedRotation - e.rotation) * 0.25;
    }
};
THREE.Material = function (b) {
    this.id = THREE.MaterialCounter.value++;
    b = b || {};
    this.opacity = b.opacity !== undefined ? b.opacity : 1;
    this.transparent = b.transparent !== undefined ? b.transparent : !1;
    this.blending = b.blending !== undefined ? b.blending : THREE.NormalBlending;
    this.depthTest = b.depthTest !== undefined ? b.depthTest : !0;
};
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NormalBlending = 0;
THREE.AdditiveBlending = 1;
THREE.SubtractiveBlending = 2;
THREE.MultiplyBlending = 3;
THREE.AdditiveAlphaBlending = 4;
THREE.MaterialCounter = { value: 0 };
THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};
THREE.LatitudeReflectionMapping = function () {};
THREE.LatitudeRefractionMapping = function () {};
THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};
THREE.UVMapping = function () {};
THREE.LineBasicMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.linewidth = b.linewidth !== undefined ? b.linewidth : 1;
    this.linecap = b.linecap !== undefined ? b.linecap : 'round';
    this.linejoin = b.linejoin !== undefined ? b.linejoin : 'round';
    this.vertexColors = b.vertexColors ? b.vertexColors : !1;
};
THREE.LineBasicMaterial.prototype = new THREE.Material();
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;
THREE.MeshBasicMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.map = b.map !== undefined ? b.map : null;
    this.lightMap = b.lightMap !== undefined ? b.lightMap : null;
    this.envMap = b.envMap !== undefined ? b.envMap : null;
    this.combine = b.combine !== undefined ? b.combine : THREE.MultiplyOperation;
    this.reflectivity = b.reflectivity !== undefined ? b.reflectivity : 1;
    this.refractionRatio = b.refractionRatio !== undefined ? b.refractionRatio : 0.98;
    this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
    this.wireframeLinecap = b.wireframeLinecap !== undefined ? b.wireframeLinecap : 'round';
    this.wireframeLinejoin = b.wireframeLinejoin !== undefined ? b.wireframeLinejoin : 'round';
    this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
    this.skinning = b.skinning !== undefined ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== undefined ? b.morphTargets : !1;
};
THREE.MeshBasicMaterial.prototype = new THREE.Material();
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
THREE.MeshLambertMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.map = b.map !== undefined ? b.map : null;
    this.lightMap = b.lightMap !== undefined ? b.lightMap : null;
    this.envMap = b.envMap !== undefined ? b.envMap : null;
    this.combine = b.combine !== undefined ? b.combine : THREE.MultiplyOperation;
    this.reflectivity = b.reflectivity !== undefined ? b.reflectivity : 1;
    this.refractionRatio = b.refractionRatio !== undefined ? b.refractionRatio : 0.98;
    this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
    this.wireframeLinecap = b.wireframeLinecap !== undefined ? b.wireframeLinecap : 'round';
    this.wireframeLinejoin = b.wireframeLinejoin !== undefined ? b.wireframeLinejoin : 'round';
    this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
    this.skinning = b.skinning !== undefined ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== undefined ? b.morphTargets : !1;
};
THREE.MeshLambertMaterial.prototype = new THREE.Material();
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;
THREE.MeshPhongMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.ambient = b.ambient !== undefined ? new THREE.Color(b.ambient) : new THREE.Color(328965);
    this.specular = b.specular !== undefined ? new THREE.Color(b.specular) : new THREE.Color(1118481);
    this.shininess = b.shininess !== undefined ? b.shininess : 30;
    this.map = b.map !== undefined ? b.map : null;
    this.lightMap = b.lightMap !== undefined ? b.lightMap : null;
    this.envMap = b.envMap !== undefined ? b.envMap : null;
    this.combine = b.combine !== undefined ? b.combine : THREE.MultiplyOperation;
    this.reflectivity = b.reflectivity !== undefined ? b.reflectivity : 1;
    this.refractionRatio = b.refractionRatio !== undefined ? b.refractionRatio : 0.98;
    this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
    this.wireframeLinecap = b.wireframeLinecap !== undefined ? b.wireframeLinecap : 'round';
    this.wireframeLinejoin = b.wireframeLinejoin !== undefined ? b.wireframeLinejoin : 'round';
    this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
    this.skinning = b.skinning !== undefined ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== undefined ? b.morphTargets : !1;
};
THREE.MeshPhongMaterial.prototype = new THREE.Material();
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;
THREE.MeshDepthMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
};
THREE.MeshDepthMaterial.prototype = new THREE.Material();
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;
THREE.MeshNormalMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.shading = b.shading ? b.shading : THREE.FlatShading;
    this.wireframe = b.wireframe ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth ? b.wireframeLinewidth : 1;
};
THREE.MeshNormalMaterial.prototype = new THREE.Material();
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;
THREE.MeshFaceMaterial = function () {};
THREE.MeshShaderMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.fragmentShader = b.fragmentShader !== undefined ? b.fragmentShader : 'void main() {}';
    this.vertexShader = b.vertexShader !== undefined ? b.vertexShader : 'void main() {}';
    this.uniforms = b.uniforms !== undefined ? b.uniforms : {};
    this.attributes = b.attributes;
    this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
    this.fog = b.fog !== undefined ? b.fog : !1;
    this.lights = b.lights !== undefined ? b.lights : !1;
    this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
    this.skinning = b.skinning !== undefined ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== undefined ? b.morphTargets : !1;
};
THREE.MeshShaderMaterial.prototype = new THREE.Material();
THREE.MeshShaderMaterial.prototype.constructor = THREE.MeshShaderMaterial;
THREE.ParticleBasicMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.map = b.map !== undefined ? b.map : null;
    this.size = b.size !== undefined ? b.size : 1;
    this.sizeAttenuation = b.sizeAttenuation !== undefined ? b.sizeAttenuation : !0;
    this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
};
THREE.ParticleBasicMaterial.prototype = new THREE.Material();
THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial;
THREE.ShadowVolumeDynamicMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.map = b.map !== undefined ? b.map : null;
    this.lightMap = b.lightMap !== undefined ? b.lightMap : null;
    this.envMap = b.envMap !== undefined ? b.envMap : null;
    this.combine = b.combine !== undefined ? b.combine : THREE.MultiplyOperation;
    this.reflectivity = b.reflectivity !== undefined ? b.reflectivity : 1;
    this.refractionRatio = b.refractionRatio !== undefined ? b.refractionRatio : 0.98;
    this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
    this.wireframeLinecap = b.wireframeLinecap !== undefined ? b.wireframeLinecap : 'round';
    this.wireframeLinejoin = b.wireframeLinejoin !== undefined ? b.wireframeLinejoin : 'round';
    this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
    this.skinning = b.skinning !== undefined ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== undefined ? b.morphTargets : !1;
};
THREE.ShadowVolumeDynamicMaterial.prototype = new THREE.Material();
THREE.ShadowVolumeDynamicMaterial.prototype.constructor = THREE.ShadowVolumeDynamicMaterial;
THREE.Texture = function (b, d, e, g, h, o) {
    this.image = b;
    this.mapping = d !== undefined ? d : new THREE.UVMapping();
    this.wrapS = e !== undefined ? e : THREE.ClampToEdgeWrapping;
    this.wrapT = g !== undefined ? g : THREE.ClampToEdgeWrapping;
    this.magFilter = h !== undefined ? h : THREE.LinearFilter;
    this.minFilter = o !== undefined ? o : THREE.LinearMipMapLinearFilter;
    this.needsUpdate = !1;
};
THREE.Texture.prototype = {
    clone: function () {
        return new THREE.Texture(this.image, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter);
    }
};
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.RepeatWrapping = 0;
THREE.ClampToEdgeWrapping = 1;
THREE.MirroredRepeatWrapping = 2;
THREE.NearestFilter = 3;
THREE.NearestMipMapNearestFilter = 4;
THREE.NearestMipMapLinearFilter = 5;
THREE.LinearFilter = 6;
THREE.LinearMipMapNearestFilter = 7;
THREE.LinearMipMapLinearFilter = 8;
THREE.ByteType = 9;
THREE.UnsignedByteType = 10;
THREE.ShortType = 11;
THREE.UnsignedShortType = 12;
THREE.IntType = 13;
THREE.UnsignedIntType = 14;
THREE.FloatType = 15;
THREE.AlphaFormat = 16;
THREE.RGBFormat = 17;
THREE.RGBAFormat = 18;
THREE.LuminanceFormat = 19;
THREE.LuminanceAlphaFormat = 20;
THREE.Particle = function (b) {
    THREE.Object3D.call(this);
    this.materials = b instanceof Array ? b : [b];
    this.matrixAutoUpdate = !1;
};
THREE.Particle.prototype = new THREE.Object3D();
THREE.Particle.prototype.constructor = THREE.Particle;
THREE.ParticleSystem = function (b, d) {
    THREE.Object3D.call(this);
    this.geometry = b;
    this.materials = d instanceof Array ? d : [d];
    this.sortParticles = !1;
};
THREE.ParticleSystem.prototype = new THREE.Object3D();
THREE.ParticleSystem.prototype.constructor = THREE.ParticleSystem;
THREE.Line = function (b, d, e) {
    THREE.Object3D.call(this);
    this.geometry = b;
    this.materials = d instanceof Array ? d : [d];
    this.type = e != undefined ? e : THREE.LineStrip;
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = new THREE.Object3D();
THREE.Line.prototype.constructor = THREE.Line;
THREE.Mesh = function (b, d) {
    THREE.Object3D.call(this);
    this.geometry = b;
    this.materials = d && d.length ? d : [d];
    this.flipSided = !1;
    this.doubleSided = !1;
    this.overdraw = !1;
    if (this.geometry) {
        this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
        this.boundRadius = b.boundingSphere.radius;
        if (this.geometry.morphTargets.length) {
            this.morphTargetBase = -1;
            this.morphTargetForcedOrder = [];
            this.morphTargetInfluences = [];
            this.morphTargetDictionary = {};
            for (var e = 0; e < this.geometry.morphTargets.length; e++) {
                this.morphTargetInfluences.push(0);
                this.morphTargetDictionary[this.geometry.morphTargets[e].name] = e;
            }
        }
    }
};
THREE.Mesh.prototype = new THREE.Object3D();
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.supr = THREE.Object3D.prototype;
THREE.Mesh.prototype.getMorphTargetIndexByName = function (b) {
    if (this.morphTargetDictionary[b] !== undefined) return this.morphTargetDictionary[b];
    console.log('THREE.Mesh.getMorphTargetIndexByName: morph target ' + b + ' does not exist. Returning 0.');
    return 0;
};
THREE.Bone = function (b) {
    THREE.Object3D.call(this);
    this.skin = b;
    this.skinMatrix = new THREE.Matrix4();
    this.hasNoneBoneChildren = !1;
};
THREE.Bone.prototype = new THREE.Object3D();
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Bone.prototype.supr = THREE.Object3D.prototype;
THREE.Bone.prototype.update = function (b, d, e) {
    this.matrixAutoUpdate && (d |= this.updateMatrix());
    if (d || this.matrixWorldNeedsUpdate) {
        b ? this.skinMatrix.multiply(b, this.matrix) : this.skinMatrix.copy(this.matrix);
        this.matrixWorldNeedsUpdate = !1;
        d = !0;
    }
    var g,
        h = this.children.length;
    if (this.hasNoneBoneChildren) {
        this.matrixWorld.multiply(this.skin.matrixWorld, this.skinMatrix);
        for (g = 0; g < h; g++) {
            b = this.children[g];
            b instanceof THREE.Bone ? b.update(this.skinMatrix, d, e) : b.update(this.matrixWorld, !0, e);
        }
    } else for (g = 0; g < h; g++) this.children[g].update(this.skinMatrix, d, e);
};
THREE.Bone.prototype.addChild = function (b) {
    if (this.children.indexOf(b) === -1) {
        b.parent !== undefined && b.parent.removeChild(b);
        b.parent = this;
        this.children.push(b);
        if (!(b instanceof THREE.Bone)) this.hasNoneBoneChildren = !0;
    }
};
THREE.SkinnedMesh = function (b, d) {
    THREE.Mesh.call(this, b, d);
    this.identityMatrix = new THREE.Matrix4();
    this.bones = [];
    this.boneMatrices = [];
    var e, g, h, o, n, p;
    if (this.geometry.bones !== undefined) {
        for (e = 0; e < this.geometry.bones.length; e++) {
            h = this.geometry.bones[e];
            o = h.pos;
            n = h.rotq;
            p = h.scl;
            g = this.addBone();
            g.name = h.name;
            g.position.set(o[0], o[1], o[2]);
            g.quaternion.set(n[0], n[1], n[2], n[3]);
            g.useQuaternion = !0;
            p !== undefined ? g.scale.set(p[0], p[1], p[2]) : g.scale.set(1, 1, 1);
        }
        for (e = 0; e < this.bones.length; e++) {
            h = this.geometry.bones[e];
            g = this.bones[e];
            h.parent === -1 ? this.addChild(g) : this.bones[h.parent].addChild(g);
        }
        this.boneMatrices = new Float32Array(16 * this.bones.length);
        this.pose();
    }
};
THREE.SkinnedMesh.prototype = new THREE.Mesh();
THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.update = function (b, d, e) {
    if (this.visible) {
        this.matrixAutoUpdate && (d |= this.updateMatrix());
        if (d || this.matrixWorldNeedsUpdate) {
            b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
            this.matrixWorldNeedsUpdate = !1;
            d = !0;
        }
        var g,
            h = this.children.length;
        for (g = 0; g < h; g++) {
            b = this.children[g];
            b instanceof THREE.Bone ? b.update(this.identityMatrix, !1, e) : b.update(this.matrixWorld, d, e);
        }
        e = this.bones.length;
        ba = this.bones;
        bm = this.boneMatrices;
        for (d = 0; d < e; d++) ba[d].skinMatrix.flattenToArrayOffset(bm, d * 16);
    }
};
THREE.SkinnedMesh.prototype.addBone = function (b) {
    b === undefined && (b = new THREE.Bone(this));
    this.bones.push(b);
    return b;
};
THREE.SkinnedMesh.prototype.pose = function () {
    this.update(undefined, !0);
    for (var b, d = [], e = 0; e < this.bones.length; e++) {
        b = this.bones[e];
        d.push(THREE.Matrix4.makeInvert(b.skinMatrix));
        b.skinMatrix.flattenToArrayOffset(this.boneMatrices, e * 16);
    }
    if (this.geometry.skinVerticesA === undefined) {
        this.geometry.skinVerticesA = [];
        this.geometry.skinVerticesB = [];
        var g;
        for (b = 0; b < this.geometry.skinIndices.length; b++) {
            e = this.geometry.vertices[b].position;
            var h = this.geometry.skinIndices[b].x,
                o = this.geometry.skinIndices[b].y;
            g = new THREE.Vector3(e.x, e.y, e.z);
            this.geometry.skinVerticesA.push(d[h].multiplyVector3(g));
            g = new THREE.Vector3(e.x, e.y, e.z);
            this.geometry.skinVerticesB.push(d[o].multiplyVector3(g));
            if (this.geometry.skinWeights[b].x + this.geometry.skinWeights[b].y !== 1) {
                e = (1 - (this.geometry.skinWeights[b].x + this.geometry.skinWeights[b].y)) * 0.5;
                this.geometry.skinWeights[b].x += e;
                this.geometry.skinWeights[b].y += e;
            }
        }
    }
};
THREE.Ribbon = function (b, d) {
    THREE.Object3D.call(this);
    this.geometry = b;
    this.materials = d instanceof Array ? d : [d];
    this.flipSided = !1;
    this.doubleSided = !1;
};
THREE.Ribbon.prototype = new THREE.Object3D();
THREE.Ribbon.prototype.constructor = THREE.Ribbon;
THREE.Sound = function (b, d, e, g) {
    THREE.Object3D.call(this);
    this.isLoaded = !1;
    this.isAddedToDOM = !1;
    this.isPlaying = !1;
    this.duration = -1;
    this.radius = d !== undefined ? Math.abs(d) : 100;
    this.volume = Math.min(1, Math.max(0, e !== undefined ? e : 1));
    this.domElement = document.createElement('audio');
    this.domElement.volume = 0;
    this.domElement.pan = 0;
    this.domElement.loop = g !== undefined ? g : !0;
    this.sources = b instanceof Array ? b : [b];
    var h;
    e = this.sources.length;
    for (b = 0; b < e; b++) {
        d = this.sources[b];
        d.toLowerCase();
        if (d.indexOf('.mp3') !== -1) h = 'audio/mpeg';
        else if (d.indexOf('.ogg') !== -1) h = 'audio/ogg';
        else d.indexOf('.wav') !== -1 && (h = 'audio/wav');
        if (this.domElement.canPlayType(h)) {
            h = document.createElement('source');
            h.src = this.sources[b];
            this.domElement.THREESound = this;
            this.domElement.appendChild(h);
            this.domElement.addEventListener('canplay', this.onLoad, !0);
            this.domElement.load();
            break;
        }
    }
};
THREE.Sound.prototype = new THREE.Object3D();
THREE.Sound.prototype.constructor = THREE.Sound;
THREE.Sound.prototype.supr = THREE.Object3D.prototype;
THREE.Sound.prototype.onLoad = function () {
    var b = this.THREESound;
    if (!b.isLoaded) {
        this.removeEventListener('canplay', this.onLoad, !0);
        b.isLoaded = !0;
        b.duration = this.duration;
        b.isPlaying && b.play();
    }
};
THREE.Sound.prototype.addToDOM = function (b) {
    this.isAddedToDOM = !0;
    b.appendChild(this.domElement);
};
THREE.Sound.prototype.play = function (b) {
    this.isPlaying = !0;
    if (this.isLoaded) {
        this.domElement.play();
        if (b) this.domElement.currentTime = b % this.duration;
    }
};
THREE.Sound.prototype.pause = function () {
    this.isPlaying = !1;
    this.domElement.pause();
};
THREE.Sound.prototype.stop = function () {
    this.isPlaying = !1;
    this.domElement.pause();
    this.domElement.currentTime = 0;
};
THREE.Sound.prototype.calculateVolumeAndPan = function (b) {
    b = b.length();
    this.domElement.volume = b <= this.radius ? this.volume * (1 - b / this.radius) : 0;
};
THREE.Sound.prototype.update = function (b, d, e) {
    if (this.matrixAutoUpdate) {
        this.matrix.setPosition(this.position);
        d = !0;
    }
    if (d || this.matrixWorldNeedsUpdate) {
        b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
        this.matrixWorldNeedsUpdate = !1;
        d = !0;
    }
    var g = this.children.length;
    for (b = 0; b < g; b++) this.children[b].update(this.matrixWorld, d, e);
};
THREE.LOD = function () {
    THREE.Object3D.call(this);
    this.LODs = [];
};
THREE.LOD.prototype = new THREE.Object3D();
THREE.LOD.prototype.constructor = THREE.LOD;
THREE.LOD.prototype.supr = THREE.Object3D.prototype;
THREE.LOD.prototype.add = function (b, d) {
    d === undefined && (d = 0);
    d = Math.abs(d);
    for (var e = 0; e < this.LODs.length; e++) if (d < this.LODs[e].visibleAtDistance) break;
    this.LODs.splice(e, 0, { visibleAtDistance: d, object3D: b });
    this.addChild(b);
};
THREE.LOD.prototype.update = function (b, d, e) {
    this.matrixAutoUpdate && (d |= this.updateMatrix());
    if (d || this.matrixWorldNeedsUpdate) {
        b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
        this.matrixWorldNeedsUpdate = !1;
        d = !0;
    }
    if (this.LODs.length > 1) {
        b = e.matrixWorldInverse;
        b = -(b.n31 * this.position.x + b.n32 * this.position.y + b.n33 * this.position.z + b.n34);
        this.LODs[0].object3D.visible = !0;
        for (var g = 1; g < this.LODs.length; g++)
            if (b >= this.LODs[g].visibleAtDistance) {
                this.LODs[g - 1].object3D.visible = !1;
                this.LODs[g].object3D.visible = !0;
            } else break;
        for (; g < this.LODs.length; g++) this.LODs[g].object3D.visible = !1;
    }
    for (b = 0; b < this.children.length; b++) this.children[b].update(this.matrixWorld, d, e);
};
THREE.ShadowVolume = function (b, d) {
    if (b instanceof THREE.Mesh) {
        THREE.Mesh.call(this, b.geometry, d ? [new THREE.ShadowVolumeDynamicMaterial()] : [new THREE.ShadowVolumeDynamicMaterial()]);
        b.addChild(this);
    } else THREE.Mesh.call(this, b, d ? [new THREE.ShadowVolumeDynamicMaterial()] : [new THREE.ShadowVolumeDynamicMaterial()]);
    this.calculateShadowVolumeGeometry();
};
THREE.ShadowVolume.prototype = new THREE.Mesh();
THREE.ShadowVolume.prototype.constructor = THREE.ShadowVolume;
THREE.ShadowVolume.prototype.supr = THREE.Mesh.prototype;
THREE.ShadowVolume.prototype.calculateShadowVolumeGeometry = function () {
    if (this.geometry.edges && this.geometry.edges.length) {
        var b,
            d,
            e,
            g,
            h,
            o,
            n,
            p,
            q,
            v,
            E,
            F,
            H,
            I,
            M = new THREE.Geometry();
        M.vertices = this.geometry.vertices;
        g = M.faces = this.geometry.faces;
        var N = (M.egdes = this.geometry.edges),
            V = (M.edgeFaces = []);
        h = 0;
        var L = [];
        b = 0;
        for (d = g.length; b < d; b++) {
            e = g[b];
            L.push(h);
            h += e instanceof THREE.Face3 ? 3 : 4;
            e.vertexNormals[0] = e.normal;
            e.vertexNormals[1] = e.normal;
            e.vertexNormals[2] = e.normal;
            if (e instanceof THREE.Face4) e.vertexNormals[3] = e.normal;
        }
        b = 0;
        for (d = N.length; b < d; b++) {
            p = N[b];
            e = p.faces[0];
            g = p.faces[1];
            h = p.faceIndices[0];
            o = p.faceIndices[1];
            n = p.vertexIndices[0];
            p = p.vertexIndices[1];
            if (e.a === n) {
                q = 'a';
                E = L[h] + 0;
            } else if (e.b === n) {
                q = 'b';
                E = L[h] + 1;
            } else if (e.c === n) {
                q = 'c';
                E = L[h] + 2;
            } else if (e.d === n) {
                q = 'd';
                E = L[h] + 3;
            }
            if (e.a === p) {
                q += 'a';
                F = L[h] + 0;
            } else if (e.b === p) {
                q += 'b';
                F = L[h] + 1;
            } else if (e.c === p) {
                q += 'c';
                F = L[h] + 2;
            } else if (e.d === p) {
                q += 'd';
                F = L[h] + 3;
            }
            if (g.a === n) {
                v = 'a';
                H = L[o] + 0;
            } else if (g.b === n) {
                v = 'b';
                H = L[o] + 1;
            } else if (g.c === n) {
                v = 'c';
                H = L[o] + 2;
            } else if (g.d === n) {
                v = 'd';
                H = L[o] + 3;
            }
            if (g.a === p) {
                v += 'a';
                I = L[o] + 0;
            } else if (g.b === p) {
                v += 'b';
                I = L[o] + 1;
            } else if (g.c === p) {
                v += 'c';
                I = L[o] + 2;
            } else if (g.d === p) {
                v += 'd';
                I = L[o] + 3;
            }
            if (q === 'ac' || q === 'ad' || q === 'ca' || q === 'da') {
                if (E > F) {
                    e = E;
                    E = F;
                    F = e;
                }
            } else if (E < F) {
                e = E;
                E = F;
                F = e;
            }
            if (v === 'ac' || v === 'ad' || v === 'ca' || v === 'da') {
                if (H > I) {
                    e = H;
                    H = I;
                    I = e;
                }
            } else if (H < I) {
                e = H;
                H = I;
                I = e;
            }
            e = new THREE.Face4(E, F, H, I);
            e.normal.set(1, 0, 0);
            V.push(e);
        }
        this.geometry = M;
    } else this.calculateShadowVolumeGeometryWithoutEdgeInfo(this.geometry);
};
THREE.ShadowVolume.prototype.calculateShadowVolumeGeometryWithoutEdgeInfo = function (b) {
    this.geometry = new THREE.Geometry();
    this.geometry.boundingSphere = b.boundingSphere;
    this.geometry.edgeFaces = [];
    var d = this.geometry.vertices,
        e = this.geometry.faces,
        g = this.geometry.edgeFaces,
        h = b.faces;
    b = b.vertices;
    var o = h.length,
        n,
        p,
        q,
        v,
        E,
        F = ['a', 'b', 'c', 'd'];
    for (q = 0; q < o; q++) {
        p = d.length;
        n = h[q];
        if (n instanceof THREE.Face4) {
            v = 4;
            p = new THREE.Face4(p, p + 1, p + 2, p + 3);
        } else {
            v = 3;
            p = new THREE.Face3(p, p + 1, p + 2);
        }
        p.normal.copy(n.normal);
        e.push(p);
        for (p = 0; p < v; p++) {
            E = b[n[F[p]]];
            d.push(new THREE.Vertex(E.position.clone()));
        }
    }
    for (o = 0; o < h.length - 1; o++) {
        b = e[o];
        for (n = o + 1; n < h.length; n++) {
            p = e[n];
            p = this.facesShareEdge(d, b, p);
            if (p !== undefined) {
                p = new THREE.Face4(p.indices[0], p.indices[3], p.indices[2], p.indices[1]);
                p.normal.set(1, 0, 0);
                g.push(p);
            }
        }
    }
};
THREE.ShadowVolume.prototype.facesShareEdge = function (b, d, e) {
    var g,
        h,
        o,
        n,
        p,
        q,
        v,
        E,
        F,
        H,
        I,
        M,
        N,
        V = 0,
        L = ['a', 'b', 'c', 'd'];
    g = d instanceof THREE.Face4 ? 4 : 3;
    h = e instanceof THREE.Face4 ? 4 : 3;
    for (M = 0; M < g; M++) {
        o = d[L[M]];
        p = b[o];
        for (N = 0; N < h; N++) {
            n = e[L[N]];
            q = b[n];
            if (Math.abs(p.position.x - q.position.x) < 1.0e-4 && Math.abs(p.position.y - q.position.y) < 1.0e-4 && Math.abs(p.position.z - q.position.z) < 1.0e-4) {
                V++;
                if (V === 1) {
                    v = p;
                    E = q;
                    F = o;
                    H = n;
                    I = L[M];
                }
                if (V === 2) {
                    I += L[M];
                    return I === 'ad' || I === 'ac'
                        ? {
                              faces: [d, e],
                              vertices: [v, E, q, p],
                              indices: [F, H, n, o],
                              vertexTypes: [1, 2, 2, 1],
                              extrudable: !0
                          }
                        : { faces: [d, e], vertices: [v, p, q, E], indices: [F, o, n, H], vertexTypes: [1, 1, 2, 2], extrudable: !0 };
                }
            }
        }
    }
};
THREE.Scene = function () {
    THREE.Object3D.call(this);
    this.matrixAutoUpdate = !1;
    this.fog = null;
    this.objects = [];
    this.lights = [];
    this.sounds = [];
    this.__objectsAdded = [];
    this.__objectsRemoved = [];
};
THREE.Scene.prototype = new THREE.Object3D();
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.supr = THREE.Object3D.prototype;
THREE.Scene.prototype.addChild = function (b) {
    this.supr.addChild.call(this, b);
    this.addChildRecurse(b);
};
THREE.Scene.prototype.addChildRecurse = function (b) {
    if (b instanceof THREE.Light) this.lights.indexOf(b) === -1 && this.lights.push(b);
    else if (b instanceof THREE.Sound) this.sounds.indexOf(b) === -1 && this.sounds.push(b);
    else if (!(b instanceof THREE.Camera || b instanceof THREE.Bone) && this.objects.indexOf(b) === -1) {
        this.objects.push(b);
        this.__objectsAdded.push(b);
    }
    for (var d = 0; d < b.children.length; d++) this.addChildRecurse(b.children[d]);
};
THREE.Scene.prototype.removeChild = function (b) {
    this.supr.removeChild.call(this, b);
    this.removeChildRecurse(b);
};
THREE.Scene.prototype.removeChildRecurse = function (b) {
    if (b instanceof THREE.Light) {
        var d = this.lights.indexOf(b);
        d !== -1 && this.lights.splice(d, 1);
    } else if (b instanceof THREE.Sound) {
        d = this.sounds.indexOf(b);
        d !== -1 && this.sounds.splice(d, 1);
    } else if (!(b instanceof THREE.Camera)) {
        d = this.objects.indexOf(b);
        if (d !== -1) {
            this.objects.splice(d, 1);
            this.__objectsRemoved.push(b);
        }
    }
    for (d = 0; d < b.children.length; d++) this.removeChildRecurse(b.children[d]);
};
THREE.Scene.prototype.addObject = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeObject = THREE.Scene.prototype.removeChild;
THREE.Scene.prototype.addLight = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeLight = THREE.Scene.prototype.removeChild;
THREE.Fog = function (b, d, e) {
    this.color = new THREE.Color(b);
    this.near = d || 1;
    this.far = e || 1e3;
};
THREE.FogExp2 = function (b, d) {
    this.color = new THREE.Color(b);
    this.density = d !== undefined ? d : 2.5e-4;
};
THREE.Projector = function () {
    function b() {
        var c = (q[p] = q[p] || new THREE.RenderableVertex());
        p++;
        return c;
    }
    function d(c, S) {
        return S.z - c.z;
    }
    function e(c, S) {
        var pa = 0,
            ra = 1,
            Fa = c.z + c.w,
            ta = S.z + S.w,
            aa = -c.z + c.w,
            ma = -S.z + S.w;
        if (Fa >= 0 && ta >= 0 && aa >= 0 && ma >= 0) return !0;
        else if ((Fa < 0 && ta < 0) || (aa < 0 && ma < 0)) return !1;
        else {
            if (Fa < 0) pa = Math.max(pa, Fa / (Fa - ta));
            else ta < 0 && (ra = Math.min(ra, Fa / (Fa - ta)));
            if (aa < 0) pa = Math.max(pa, aa / (aa - ma));
            else ma < 0 && (ra = Math.min(ra, aa / (aa - ma)));
            if (ra < pa) return !1;
            else {
                c.lerpSelf(S, pa);
                S.lerpSelf(c, 1 - ra);
                return !0;
            }
        }
    }
    var g,
        h,
        o = [],
        n,
        p,
        q = [],
        v,
        E,
        F = [],
        H,
        I = [],
        M,
        N,
        V = [],
        L,
        sa,
        da = [],
        oa = new THREE.Vector4(),
        Z = new THREE.Vector4(),
        K = new THREE.Matrix4(),
        Ia = new THREE.Matrix4(),
        ca = [new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4()],
        Ea = new THREE.Vector4(),
        fa = new THREE.Vector4();
    this.projectVector = function (c, S) {
        K.multiply(S.projectionMatrix, S.matrixWorldInverse);
        K.multiplyVector3(c);
        return c;
    };
    this.unprojectVector = function (c, S) {
        K.multiply(S.matrixWorld, THREE.Matrix4.makeInvert(S.projectionMatrix));
        K.multiplyVector3(c);
        return c;
    };
    this.projectObjects = function (c, S, pa) {
        S = [];
        var ra, Fa, ta;
        h = 0;
        Fa = c.objects;
        c = 0;
        for (ra = Fa.length; c < ra; c++) {
            ta = Fa[c];
            var aa;
            if (!(aa = !ta.visible))
                if ((aa = ta instanceof THREE.Mesh)) {
                    a: {
                        aa = void 0;
                        for (var ma = ta.matrixWorld, na = -ta.geometry.boundingSphere.radius * Math.max(ta.scale.x, Math.max(ta.scale.y, ta.scale.z)), ga = 0; ga < 6; ga++) {
                            aa = ca[ga].x * ma.n14 + ca[ga].y * ma.n24 + ca[ga].z * ma.n34 + ca[ga].w;
                            if (aa <= na) {
                                aa = !1;
                                break a;
                            }
                        }
                        aa = !0;
                    }
                    aa = !aa;
                }
            if (!aa) {
                aa = o[h] = o[h] || new THREE.RenderableObject();
                h++;
                g = aa;
                oa.copy(ta.position);
                K.multiplyVector3(oa);
                g.object = ta;
                g.z = oa.z;
                S.push(g);
            }
        }
        pa && S.sort(d);
        return S;
    };
    this.projectScene = function (c, S, pa) {
        var ra = [],
            Fa = S.near,
            ta = S.far,
            aa,
            ma,
            na,
            ga,
            Y,
            wa,
            qa,
            ya,
            za,
            $,
            Pa,
            Ta,
            Xa,
            Ua,
            Sa,
            R,
            J;
        sa = N = H = E = 0;
        S.matrixAutoUpdate && S.updateMatrix();
        c.update(undefined, !1, S);
        K.multiply(S.projectionMatrix, S.matrixWorldInverse);
        ca[0].set(K.n41 - K.n11, K.n42 - K.n12, K.n43 - K.n13, K.n44 - K.n14);
        ca[1].set(K.n41 + K.n11, K.n42 + K.n12, K.n43 + K.n13, K.n44 + K.n14);
        ca[2].set(K.n41 + K.n21, K.n42 + K.n22, K.n43 + K.n23, K.n44 + K.n24);
        ca[3].set(K.n41 - K.n21, K.n42 - K.n22, K.n43 - K.n23, K.n44 - K.n24);
        ca[4].set(K.n41 - K.n31, K.n42 - K.n32, K.n43 - K.n33, K.n44 - K.n34);
        ca[5].set(K.n41 + K.n31, K.n42 + K.n32, K.n43 + K.n33, K.n44 + K.n34);
        for (aa = 0; aa < 6; aa++) {
            za = ca[aa];
            za.divideScalar(Math.sqrt(za.x * za.x + za.y * za.y + za.z * za.z));
        }
        za = this.projectObjects(c, S, !0);
        c = 0;
        for (aa = za.length; c < aa; c++) {
            $ = za[c].object;
            if ($.visible) {
                Pa = $.matrixWorld;
                Ta = $.matrixRotationWorld;
                Xa = $.materials;
                Ua = $.overdraw;
                p = 0;
                if ($ instanceof THREE.Mesh) {
                    Sa = $.geometry;
                    ga = Sa.vertices;
                    R = Sa.faces;
                    Sa = Sa.faceVertexUvs;
                    ma = 0;
                    for (na = ga.length; ma < na; ma++) {
                        n = b();
                        n.positionWorld.copy(ga[ma].position);
                        Pa.multiplyVector3(n.positionWorld);
                        n.positionScreen.copy(n.positionWorld);
                        K.multiplyVector4(n.positionScreen);
                        n.positionScreen.x /= n.positionScreen.w;
                        n.positionScreen.y /= n.positionScreen.w;
                        n.visible = n.positionScreen.z > Fa && n.positionScreen.z < ta;
                    }
                    ga = 0;
                    for (ma = R.length; ga < ma; ga++) {
                        na = R[ga];
                        if (na instanceof THREE.Face3) {
                            Y = q[na.a];
                            wa = q[na.b];
                            qa = q[na.c];
                            if (Y.visible && wa.visible && qa.visible && ($.doubleSided || $.flipSided != (qa.positionScreen.x - Y.positionScreen.x) * (wa.positionScreen.y - Y.positionScreen.y) - (qa.positionScreen.y - Y.positionScreen.y) * (wa.positionScreen.x - Y.positionScreen.x) < 0)) {
                                ya = F[E] = F[E] || new THREE.RenderableFace3();
                                E++;
                                v = ya;
                                v.v1.copy(Y);
                                v.v2.copy(wa);
                                v.v3.copy(qa);
                            } else continue;
                        } else if (na instanceof THREE.Face4) {
                            Y = q[na.a];
                            wa = q[na.b];
                            qa = q[na.c];
                            ya = q[na.d];
                            if (Y.visible && wa.visible && qa.visible && ya.visible && ($.doubleSided || $.flipSided != ((ya.positionScreen.x - Y.positionScreen.x) * (wa.positionScreen.y - Y.positionScreen.y) - (ya.positionScreen.y - Y.positionScreen.y) * (wa.positionScreen.x - Y.positionScreen.x) < 0 || (wa.positionScreen.x - qa.positionScreen.x) * (ya.positionScreen.y - qa.positionScreen.y) - (wa.positionScreen.y - qa.positionScreen.y) * (ya.positionScreen.x - qa.positionScreen.x) < 0))) {
                                J = I[H] = I[H] || new THREE.RenderableFace4();
                                H++;
                                v = J;
                                v.v1.copy(Y);
                                v.v2.copy(wa);
                                v.v3.copy(qa);
                                v.v4.copy(ya);
                            } else continue;
                        }
                        v.normalWorld.copy(na.normal);
                        Ta.multiplyVector3(v.normalWorld);
                        v.centroidWorld.copy(na.centroid);
                        Pa.multiplyVector3(v.centroidWorld);
                        v.centroidScreen.copy(v.centroidWorld);
                        K.multiplyVector3(v.centroidScreen);
                        qa = na.vertexNormals;
                        Y = 0;
                        for (wa = qa.length; Y < wa; Y++) {
                            ya = v.vertexNormalsWorld[Y];
                            ya.copy(qa[Y]);
                            Ta.multiplyVector3(ya);
                        }
                        Y = 0;
                        for (wa = Sa.length; Y < wa; Y++)
                            if ((J = Sa[Y][ga])) {
                                qa = 0;
                                for (ya = J.length; qa < ya; qa++) v.uvs[Y][qa] = J[qa];
                            }
                        v.meshMaterials = Xa;
                        v.faceMaterials = na.materials;
                        v.overdraw = Ua;
                        v.z = v.centroidScreen.z;
                        ra.push(v);
                    }
                } else if ($ instanceof THREE.Line) {
                    Ia.multiply(K, Pa);
                    ga = $.geometry.vertices;
                    Y = b();
                    Y.positionScreen.copy(ga[0].position);
                    Ia.multiplyVector4(Y.positionScreen);
                    ma = 1;
                    for (na = ga.length; ma < na; ma++) {
                        Y = b();
                        Y.positionScreen.copy(ga[ma].position);
                        Ia.multiplyVector4(Y.positionScreen);
                        wa = q[p - 2];
                        Ea.copy(Y.positionScreen);
                        fa.copy(wa.positionScreen);
                        if (e(Ea, fa)) {
                            Ea.multiplyScalar(1 / Ea.w);
                            fa.multiplyScalar(1 / fa.w);
                            Pa = V[N] = V[N] || new THREE.RenderableLine();
                            N++;
                            M = Pa;
                            M.v1.positionScreen.copy(Ea);
                            M.v2.positionScreen.copy(fa);
                            M.z = Math.max(Ea.z, fa.z);
                            M.materials = $.materials;
                            ra.push(M);
                        }
                    }
                } else if ($ instanceof THREE.Particle) {
                    Z.set($.position.x, $.position.y, $.position.z, 1);
                    K.multiplyVector4(Z);
                    Z.z /= Z.w;
                    if (Z.z > 0 && Z.z < 1) {
                        Pa = da[sa] = da[sa] || new THREE.RenderableParticle();
                        sa++;
                        L = Pa;
                        L.x = Z.x / Z.w;
                        L.y = Z.y / Z.w;
                        L.z = Z.z;
                        L.rotation = $.rotation.z;
                        L.scale.x = $.scale.x * Math.abs(L.x - (Z.x + S.projectionMatrix.n11) / (Z.w + S.projectionMatrix.n14));
                        L.scale.y = $.scale.y * Math.abs(L.y - (Z.y + S.projectionMatrix.n22) / (Z.w + S.projectionMatrix.n24));
                        L.materials = $.materials;
                        ra.push(L);
                    }
                }
            }
        }
        pa && ra.sort(d);
        return ra;
    };
};
THREE.SoundRenderer = function () {
    this.volume = 1;
    this.domElement = document.createElement('div');
    this.domElement.id = 'THREESound';
    this.cameraPosition = new THREE.Vector3();
    this.soundPosition = new THREE.Vector3();
    this.render = function (b, d, e) {
        e && b.update(undefined, !1, d);
        e = b.sounds;
        var g,
            h = e.length;
        for (g = 0; g < h; g++) {
            b = e[g];
            this.soundPosition.set(b.matrixWorld.n14, b.matrixWorld.n24, b.matrixWorld.n34);
            this.soundPosition.subSelf(d.position);
            if (b.isPlaying && b.isLoaded) {
                b.isAddedToDOM || b.addToDOM(this.domElement);
                b.calculateVolumeAndPan(this.soundPosition);
            }
        }
    };
};
THREE.ShaderChunk = {
    fog_pars_fragment: '#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif',
    fog_fragment: '#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif',
    envmap_pars_fragment: '#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform int combine;\n#endif',
    envmap_fragment: '#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( -vReflect.x, vReflect.yz ) );\nif ( combine == 1 ) {\ngl_FragColor = vec4( mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity ), opacity );\n} else {\ngl_FragColor = gl_FragColor * cubeColor;\n}\n#endif',
    envmap_pars_vertex: '#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif',
    envmap_vertex: '#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif',
    map_particle_pars_fragment: '#ifdef USE_MAP\nuniform sampler2D map;\n#endif',
    map_particle_fragment: '#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif',
    map_pars_fragment: '#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif',
    map_pars_vertex: '#ifdef USE_MAP\nvarying vec2 vUv;\n#endif',
    map_fragment: '#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif',
    map_vertex: '#ifdef USE_MAP\nvUv = uv;\n#endif',
    lightmap_pars_fragment: '#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif',
    lightmap_pars_vertex: '#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif',
    lightmap_fragment: '#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif',
    lightmap_vertex: '#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif',
    lights_pars_vertex: 'uniform bool enableLighting;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#ifdef PHONG\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif',
    lights_vertex:
        'if ( !enableLighting ) {\nvLightWeighting = vec3( 1.0 );\n} else {\nvLightWeighting = ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nfloat directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef PHONG\nvPointLight[ i ] = vec4( lVector, lDistance );\n#endif\n}\n#endif\n}',
    lights_pars_fragment: '#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;',
    lights_fragment:
        'vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 mColor = vec4( diffuse, opacity );\nvec4 mSpecular = vec4( specular, opacity );\n#if MAX_POINT_LIGHTS > 0\nvec4 pointDiffuse  = vec4( 0.0 );\nvec4 pointSpecular = vec4( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + vViewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = pow( pointDotNormalHalf, shininess );\npointDiffuse  += mColor * pointDiffuseWeight * pointDistance;\npointSpecular += mSpecular * pointSpecularWeight * pointDistance;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec4 dirDiffuse  = vec4( 0.0 );\nvec4 dirSpecular = vec4( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = pow( dirDotNormalHalf, shininess );\ndirDiffuse  += mColor * dirDiffuseWeight;\ndirSpecular += mSpecular * dirSpecularWeight;\n}\n#endif\nvec4 totalLight = vec4( ambient, opacity );\n#if MAX_DIR_LIGHTS > 0\ntotalLight += dirDiffuse + dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalLight += pointDiffuse + pointSpecular;\n#endif\ngl_FragColor = gl_FragColor * totalLight;',
    color_pars_fragment: '#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif',
    color_fragment: '#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif',
    color_pars_vertex: '#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif',
    color_vertex: '#ifdef USE_COLOR\nvColor = color;\n#endif',
    skinning_pars_vertex: '#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif',
    skinning_vertex: '#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif',
    morphtarget_pars_vertex: '#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif',
    morphtarget_vertex: '#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif',
    default_vertex: '#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif'
};
THREE.UniformsUtils = {
    merge: function (b) {
        var d,
            e,
            g,
            h = {};
        for (d = 0; d < b.length; d++) {
            g = this.clone(b[d]);
            for (e in g) h[e] = g[e];
        }
        return h;
    },
    clone: function (b) {
        var d,
            e,
            g,
            h = {};
        for (d in b) {
            h[d] = {};
            for (e in b[d]) {
                g = b[d][e];
                h[d][e] = g instanceof THREE.Color || g instanceof THREE.Vector3 || g instanceof THREE.Texture ? g.clone() : g;
            }
        }
        return h;
    }
};
THREE.UniformsLib = {
    common: {
        diffuse: { type: 'c', value: new THREE.Color(15658734) },
        opacity: { type: 'f', value: 1 },
        map: { type: 't', value: 0, texture: null },
        lightMap: { type: 't', value: 2, texture: null },
        envMap: { type: 't', value: 1, texture: null },
        useRefract: { type: 'i', value: 0 },
        reflectivity: { type: 'f', value: 1 },
        refractionRatio: { type: 'f', value: 0.98 },
        combine: { type: 'i', value: 0 },
        fogDensity: { type: 'f', value: 2.5e-4 },
        fogNear: { type: 'f', value: 1 },
        fogFar: { type: 'f', value: 2e3 },
        fogColor: { type: 'c', value: new THREE.Color(16777215) },
        morphTargetInfluences: {
            type: 'f',
            value: 0
        }
    },
    lights: { enableLighting: { type: 'i', value: 1 }, ambientLightColor: { type: 'fv', value: [] }, directionalLightDirection: { type: 'fv', value: [] }, directionalLightColor: { type: 'fv', value: [] }, pointLightColor: { type: 'fv', value: [] }, pointLightPosition: { type: 'fv', value: [] }, pointLightDistance: { type: 'fv1', value: [] } },
    particle: {
        psColor: { type: 'c', value: new THREE.Color(15658734) },
        opacity: { type: 'f', value: 1 },
        size: { type: 'f', value: 1 },
        scale: { type: 'f', value: 1 },
        map: { type: 't', value: 0, texture: null },
        fogDensity: { type: 'f', value: 2.5e-4 },
        fogNear: { type: 'f', value: 1 },
        fogFar: { type: 'f', value: 2e3 },
        fogColor: { type: 'c', value: new THREE.Color(16777215) }
    }
};
THREE.ShaderLib = {
    lensFlareVertexTexture: {
        vertexShader:
            'uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform    int     renderType;\nuniform\tsampler2D\tocclusionMap;\nattribute \tvec2 \tposition;\nattribute  vec2\tUV;\nvarying\tvec2\tvUV;\nvarying\tfloat\tvVisibility;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ));\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}',
        fragmentShader: '#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nuniform    int         renderType;\nvarying\tvec2\t\tvUV;\nvarying\tfloat\t\tvVisibility;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * vVisibility;\ngl_FragColor = color;\n}\n}'
    },
    lensFlare: {
        vertexShader: 'uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform    int     renderType;\nattribute \tvec2 \tposition;\nattribute  vec2\tUV;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}',
        fragmentShader: '#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tsampler2D\tocclusionMap;\nuniform\tfloat\t\topacity;\nuniform    int         renderType;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 )).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * visibility;\ngl_FragColor = color;\n}\n}'
    },
    sprite: {
        vertexShader:
            'uniform\tint\t\tuseScreenCoordinates;\nuniform    int     affectedByDistance;\nuniform\tvec3\tscreenPosition;\nuniform \tmat4 \tmodelViewMatrix;\nuniform \tmat4 \tprojectionMatrix;\nuniform    float   rotation;\nuniform    vec2    scale;\nuniform    vec2    alignment;\nuniform    vec2    uvOffset;\nuniform\tvec2    uvScale;\nattribute \tvec2 \tposition;\nattribute  vec2\tuv;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}',
        fragmentShader: '#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity;\ngl_FragColor = color;\n}'
    },
    shadowPost: { vertexShader: 'uniform \tmat4 \tprojectionMatrix;\nattribute \tvec3 \tposition;\nvoid main(void)\n{\ngl_Position = projectionMatrix * vec4( position, 1.0 );\n}', fragmentShader: '#ifdef GL_ES\nprecision highp float;\n#endif\nuniform \tfloat \tdarkness;\nvoid main( void )\n{\ngl_FragColor = vec4( 0, 0, 0, darkness );\n}' },
    shadowVolumeDynamic: { uniforms: { directionalLightDirection: { type: 'fv', value: [] } }, vertexShader: 'uniform \tvec3 \tdirectionalLightDirection;\nvoid main() {\nvec4 pos      = objectMatrix * vec4( position, 1.0 );\nvec3 norm     = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nvec4 extruded = vec4( directionalLightDirection * 5000.0 * step( 0.0, dot( directionalLightDirection, norm )), 0.0 );\ngl_Position   = projectionMatrix * viewMatrix * ( pos + extruded );\n}', fragmentShader: 'void main() {\ngl_FragColor = vec4( 1.0 );\n}' },
    depth: { uniforms: { mNear: { type: 'f', value: 1 }, mFar: { type: 'f', value: 2e3 }, opacity: { type: 'f', value: 1 } }, fragmentShader: 'uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}', vertexShader: 'void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}' },
    normal: {
        uniforms: { opacity: { type: 'f', value: 1 } },
        fragmentShader: 'uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}',
        vertexShader: 'varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}'
    },
    basic: {
        uniforms: THREE.UniformsLib.common,
        fragmentShader: ['uniform vec3 diffuse;\nuniform float opacity;', THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, 'void main() {\ngl_FragColor = vec4( diffuse, opacity );', THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, '}'].join('\n'),
        vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, 'void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );', THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, '}'].join('\n')
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights]),
        fragmentShader: ['uniform vec3 diffuse;\nuniform float opacity;\nvarying vec3 vLightWeighting;', THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, 'void main() {\ngl_FragColor = vec4( diffuse, opacity );\ngl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );', THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, '}'].join('\n'),
        vertexShader: ['varying vec3 vLightWeighting;', THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, 'void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );', THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, 'vec3 transformedNormal = normalize( normalMatrix * normal );', THREE.ShaderChunk.lights_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, '}'].join('\n')
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights, { ambient: { type: 'c', value: new THREE.Color(328965) }, specular: { type: 'c', value: new THREE.Color(1118481) }, shininess: { type: 'f', value: 30 } }]),
        fragmentShader: ['uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 specular;\nuniform float shininess;\nvarying vec3 vLightWeighting;', THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_pars_fragment, 'void main() {\ngl_FragColor = vec4( vLightWeighting, 1.0 );', THREE.ShaderChunk.lights_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, '}'].join('\n'),
        vertexShader: ['#define PHONG\nvarying vec3 vLightWeighting;\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;', THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, 'void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );', THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, '#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = cameraPosition - mPosition.xyz;\nvec3 transformedNormal = normalize( normalMatrix * normal );\nvNormal = transformedNormal;', THREE.ShaderChunk.lights_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, '}'].join('\n')
    },
    particle_basic: {
        uniforms: THREE.UniformsLib.particle,
        fragmentShader: ['uniform vec3 psColor;\nuniform float opacity;', THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, 'void main() {\ngl_FragColor = vec4( psColor, opacity );', THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.fog_fragment, '}'].join('\n'),
        vertexShader: ['uniform float size;\nuniform float scale;', THREE.ShaderChunk.color_pars_vertex, 'void main() {', THREE.ShaderChunk.color_vertex, 'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;\n}'].join('\n')
    }
};
THREE.WebGLRenderer = function (b) {
    function d(f, s, j) {
        var k,
            m,
            w,
            x = f.vertices,
            u = x.length,
            A = f.colors,
            t = A.length,
            y = f.__vertexArray,
            z = f.__colorArray,
            D = f.__sortArray,
            B = f.__dirtyVertices,
            O = f.__dirtyColors;
        if (j.sortParticles) {
            Pa.multiplySelf(j.matrixWorld);
            for (k = 0; k < u; k++) {
                m = x[k].position;
                Ua.copy(m);
                Pa.multiplyVector3(Ua);
                D[k] = [Ua.z, k];
            }
            D.sort(function (W, P) {
                return P[0] - W[0];
            });
            for (k = 0; k < u; k++) {
                m = x[D[k][1]].position;
                w = k * 3;
                y[w] = m.x;
                y[w + 1] = m.y;
                y[w + 2] = m.z;
            }
            for (k = 0; k < t; k++) {
                w = k * 3;
                color = A[D[k][1]];
                z[w] = color.r;
                z[w + 1] = color.g;
                z[w + 2] = color.b;
            }
        } else {
            if (B)
                for (k = 0; k < u; k++) {
                    m = x[k].position;
                    w = k * 3;
                    y[w] = m.x;
                    y[w + 1] = m.y;
                    y[w + 2] = m.z;
                }
            if (O)
                for (k = 0; k < t; k++) {
                    color = A[k];
                    w = k * 3;
                    z[w] = color.r;
                    z[w + 1] = color.g;
                    z[w + 2] = color.b;
                }
        }
        if (B || j.sortParticles) {
            c.bindBuffer(c.ARRAY_BUFFER, f.__webglVertexBuffer);
            c.bufferData(c.ARRAY_BUFFER, y, s);
        }
        if (O || j.sortParticles) {
            c.bindBuffer(c.ARRAY_BUFFER, f.__webglColorBuffer);
            c.bufferData(c.ARRAY_BUFFER, z, s);
        }
    }
    function e(f, s, j, k, m) {
        k.program || aa.initMaterial(k, s, j, m);
        var w = k.program,
            x = w.uniforms,
            u = k.uniforms;
        if (w != ra) {
            c.useProgram(w);
            ra = w;
        }
        c.uniformMatrix4fv(x.projectionMatrix, !1, Ta);
        if (j && (k instanceof THREE.MeshBasicMaterial || k instanceof THREE.MeshLambertMaterial || k instanceof THREE.MeshPhongMaterial || k instanceof THREE.LineBasicMaterial || k instanceof THREE.ParticleBasicMaterial || k.fog)) {
            u.fogColor.value = j.color;
            if (j instanceof THREE.Fog) {
                u.fogNear.value = j.near;
                u.fogFar.value = j.far;
            } else if (j instanceof THREE.FogExp2) u.fogDensity.value = j.density;
        }
        if (k instanceof THREE.MeshPhongMaterial || k instanceof THREE.MeshLambertMaterial || k.lights) {
            var A,
                t,
                y = 0,
                z = 0,
                D = 0,
                B,
                O,
                W,
                P,
                X = Sa,
                Ga = X.directional.colors,
                T = X.directional.positions,
                Q = X.point.colors,
                U = X.point.positions,
                ua = X.point.distances,
                r = 0,
                G = 0;
            j = t = P = 0;
            for (A = s.length; j < A; j++) {
                t = s[j];
                B = t.color;
                O = t.position;
                W = t.intensity;
                P = t.distance;
                if (t instanceof THREE.AmbientLight) {
                    y += B.r;
                    z += B.g;
                    D += B.b;
                } else if (t instanceof THREE.DirectionalLight) {
                    P = r * 3;
                    Ga[P] = B.r * W;
                    Ga[P + 1] = B.g * W;
                    Ga[P + 2] = B.b * W;
                    T[P] = O.x;
                    T[P + 1] = O.y;
                    T[P + 2] = O.z;
                    r += 1;
                } else if (t instanceof THREE.PointLight) {
                    t = G * 3;
                    Q[t] = B.r * W;
                    Q[t + 1] = B.g * W;
                    Q[t + 2] = B.b * W;
                    U[t] = O.x;
                    U[t + 1] = O.y;
                    U[t + 2] = O.z;
                    ua[G] = P;
                    G += 1;
                }
            }
            for (j = r * 3; j < Ga.length; j++) Ga[j] = 0;
            for (j = G * 3; j < Q.length; j++) Q[j] = 0;
            X.point.length = G;
            X.directional.length = r;
            X.ambient[0] = y;
            X.ambient[1] = z;
            X.ambient[2] = D;
            j = Sa;
            u.enableLighting.value = j.directional.length + j.point.length;
            u.ambientLightColor.value = j.ambient;
            u.directionalLightColor.value = j.directional.colors;
            u.directionalLightDirection.value = j.directional.positions;
            u.pointLightColor.value = j.point.colors;
            u.pointLightPosition.value = j.point.positions;
            u.pointLightDistance.value = j.point.distances;
        }
        if (k instanceof THREE.MeshBasicMaterial || k instanceof THREE.MeshLambertMaterial || k instanceof THREE.MeshPhongMaterial) {
            u.diffuse.value = k.color;
            u.opacity.value = k.opacity;
            u.map.texture = k.map;
            u.lightMap.texture = k.lightMap;
            u.envMap.texture = k.envMap;
            u.reflectivity.value = k.reflectivity;
            u.refractionRatio.value = k.refractionRatio;
            u.combine.value = k.combine;
            u.useRefract.value = k.envMap && k.envMap.mapping instanceof THREE.CubeRefractionMapping;
        }
        if (k instanceof THREE.LineBasicMaterial) {
            u.diffuse.value = k.color;
            u.opacity.value = k.opacity;
        } else if (k instanceof THREE.ParticleBasicMaterial) {
            u.psColor.value = k.color;
            u.opacity.value = k.opacity;
            u.size.value = k.size;
            u.scale.value = S.height / 2;
            u.map.texture = k.map;
        } else if (k instanceof THREE.MeshPhongMaterial) {
            u.ambient.value = k.ambient;
            u.specular.value = k.specular;
            u.shininess.value = k.shininess;
        } else if (k instanceof THREE.MeshDepthMaterial) {
            u.mNear.value = f.near;
            u.mFar.value = f.far;
            u.opacity.value = k.opacity;
        } else if (k instanceof THREE.MeshNormalMaterial) u.opacity.value = k.opacity;
        for (var i in u)
            if ((z = w.uniforms[i])) {
                A = u[i];
                y = A.type;
                j = A.value;
                if (y == 'i') c.uniform1i(z, j);
                else if (y == 'f') c.uniform1f(z, j);
                else if (y == 'fv1') c.uniform1fv(z, j);
                else if (y == 'fv') c.uniform3fv(z, j);
                else if (y == 'v2') c.uniform2f(z, j.x, j.y);
                else if (y == 'v3') c.uniform3f(z, j.x, j.y, j.z);
                else if (y == 'v4') c.uniform4f(z, j.x, j.y, j.z, j.w);
                else if (y == 'c') c.uniform3f(z, j.r, j.g, j.b);
                else if (y == 't') {
                    c.uniform1i(z, j);
                    if ((A = A.texture))
                        if (A.image instanceof Array && A.image.length == 6) {
                            if (A.image.length == 6) {
                                if (A.needsUpdate) {
                                    if (A.__webglInit) {
                                        c.bindTexture(c.TEXTURE_CUBE_MAP, A.image.__webglTextureCube);
                                        for (y = 0; y < 6; ++y) c.texSubImage2D(c.TEXTURE_CUBE_MAP_POSITIVE_X + y, 0, 0, 0, c.RGBA, c.UNSIGNED_BYTE, A.image[y]);
                                    } else {
                                        A.image.__webglTextureCube = c.createTexture();
                                        c.bindTexture(c.TEXTURE_CUBE_MAP, A.image.__webglTextureCube);
                                        for (y = 0; y < 6; ++y) c.texImage2D(c.TEXTURE_CUBE_MAP_POSITIVE_X + y, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, A.image[y]);
                                        A.__webglInit = !0;
                                    }
                                    Z(c.TEXTURE_CUBE_MAP, A, A.image[0]);
                                    c.bindTexture(c.TEXTURE_CUBE_MAP, null);
                                    A.needsUpdate = !1;
                                }
                                c.activeTexture(c.TEXTURE0 + j);
                                c.bindTexture(c.TEXTURE_CUBE_MAP, A.image.__webglTextureCube);
                            }
                        } else K(A, j);
                }
            }
        c.uniformMatrix4fv(x.modelViewMatrix, !1, m._modelViewMatrixArray);
        c.uniformMatrix3fv(x.normalMatrix, !1, m._normalMatrixArray);
        (k instanceof THREE.MeshShaderMaterial || k instanceof THREE.MeshPhongMaterial || k.envMap) && c.uniform3f(x.cameraPosition, f.position.x, f.position.y, f.position.z);
        (k instanceof THREE.MeshShaderMaterial || k.envMap || k.skinning) && c.uniformMatrix4fv(x.objectMatrix, !1, m._objectMatrixArray);
        (k instanceof THREE.MeshPhongMaterial || k instanceof THREE.MeshLambertMaterial || k instanceof THREE.MeshShaderMaterial || k.skinning) && c.uniformMatrix4fv(x.viewMatrix, !1, Xa);
        if (k instanceof THREE.ShadowVolumeDynamicMaterial) {
            f = u.directionalLightDirection.value;
            f[0] = -s[1].position.x;
            f[1] = -s[1].position.y;
            f[2] = -s[1].position.z;
            c.uniform3fv(x.directionalLightDirection, f);
            c.uniformMatrix4fv(x.objectMatrix, !1, m._objectMatrixArray);
            c.uniformMatrix4fv(x.viewMatrix, !1, Xa);
        }
        if (k.skinning) {
            c.uniformMatrix4fv(x.cameraInverseMatrix, !1, Xa);
            c.uniformMatrix4fv(x.boneGlobalMatrices, !1, m.boneMatrices);
        }
        return w;
    }
    function g(f, s, j, k, m, w) {
        if (k.opacity != 0) {
            var x;
            f = e(f, s, j, k, w).attributes;
            if (k.morphTargets) {
                s = k.program.attributes;
                w.morphTargetBase !== -1 ? c.bindBuffer(c.ARRAY_BUFFER, m.__webglMorphTargetsBuffers[w.morphTargetBase]) : c.bindBuffer(c.ARRAY_BUFFER, m.__webglVertexBuffer);
                c.vertexAttribPointer(s.position, 3, c.FLOAT, !1, 0, 0);
                if (w.morphTargetForcedOrder.length) {
                    j = 0;
                    for (var u = w.morphTargetForcedOrder, A = w.morphTargetInfluences; j < k.numSupportedMorphTargets && j < u.length; ) {
                        c.bindBuffer(c.ARRAY_BUFFER, m.__webglMorphTargetsBuffers[u[j]]);
                        c.vertexAttribPointer(s['morphTarget' + j], 3, c.FLOAT, !1, 0, 0);
                        w.__webglMorphTargetInfluences[j] = A[u[j]];
                        j++;
                    }
                } else {
                    u = [];
                    var t = -1,
                        y = 0;
                    A = w.morphTargetInfluences;
                    var z,
                        D = A.length;
                    j = 0;
                    for (w.morphTargetBase !== -1 && (u[w.morphTargetBase] = !0); j < k.numSupportedMorphTargets; ) {
                        for (z = 0; z < D; z++)
                            if (!u[z] && A[z] > t) {
                                y = z;
                                t = A[y];
                            }
                        c.bindBuffer(c.ARRAY_BUFFER, m.__webglMorphTargetsBuffers[y]);
                        c.vertexAttribPointer(s['morphTarget' + j], 3, c.FLOAT, !1, 0, 0);
                        w.__webglMorphTargetInfluences[j] = t;
                        u[y] = 1;
                        t = -1;
                        j++;
                    }
                }
                c.uniform1fv(k.program.uniforms.morphTargetInfluences, w.__webglMorphTargetInfluences);
            } else {
                c.bindBuffer(c.ARRAY_BUFFER, m.__webglVertexBuffer);
                c.vertexAttribPointer(f.position, 3, c.FLOAT, !1, 0, 0);
            }
            if (m.__webglCustomAttributes)
                for (x in m.__webglCustomAttributes)
                    if (f[x] >= 0) {
                        s = m.__webglCustomAttributes[x];
                        c.bindBuffer(c.ARRAY_BUFFER, s.buffer);
                        c.vertexAttribPointer(f[x], s.size, c.FLOAT, !1, 0, 0);
                    }
            if (f.color >= 0) {
                c.bindBuffer(c.ARRAY_BUFFER, m.__webglColorBuffer);
                c.vertexAttribPointer(f.color, 3, c.FLOAT, !1, 0, 0);
            }
            if (f.normal >= 0) {
                c.bindBuffer(c.ARRAY_BUFFER, m.__webglNormalBuffer);
                c.vertexAttribPointer(f.normal, 3, c.FLOAT, !1, 0, 0);
            }
            if (f.tangent >= 0) {
                c.bindBuffer(c.ARRAY_BUFFER, m.__webglTangentBuffer);
                c.vertexAttribPointer(f.tangent, 4, c.FLOAT, !1, 0, 0);
            }
            if (f.uv >= 0)
                if (m.__webglUVBuffer) {
                    c.bindBuffer(c.ARRAY_BUFFER, m.__webglUVBuffer);
                    c.vertexAttribPointer(f.uv, 2, c.FLOAT, !1, 0, 0);
                    c.enableVertexAttribArray(f.uv);
                } else c.disableVertexAttribArray(f.uv);
            if (f.uv2 >= 0)
                if (m.__webglUV2Buffer) {
                    c.bindBuffer(c.ARRAY_BUFFER, m.__webglUV2Buffer);
                    c.vertexAttribPointer(f.uv2, 2, c.FLOAT, !1, 0, 0);
                    c.enableVertexAttribArray(f.uv2);
                } else c.disableVertexAttribArray(f.uv2);
            if (k.skinning && f.skinVertexA >= 0 && f.skinVertexB >= 0 && f.skinIndex >= 0 && f.skinWeight >= 0) {
                c.bindBuffer(c.ARRAY_BUFFER, m.__webglSkinVertexABuffer);
                c.vertexAttribPointer(f.skinVertexA, 4, c.FLOAT, !1, 0, 0);
                c.bindBuffer(c.ARRAY_BUFFER, m.__webglSkinVertexBBuffer);
                c.vertexAttribPointer(f.skinVertexB, 4, c.FLOAT, !1, 0, 0);
                c.bindBuffer(c.ARRAY_BUFFER, m.__webglSkinIndicesBuffer);
                c.vertexAttribPointer(f.skinIndex, 4, c.FLOAT, !1, 0, 0);
                c.bindBuffer(c.ARRAY_BUFFER, m.__webglSkinWeightsBuffer);
                c.vertexAttribPointer(f.skinWeight, 4, c.FLOAT, !1, 0, 0);
            }
            if (w instanceof THREE.Mesh)
                if (k.wireframe) {
                    c.lineWidth(k.wireframeLinewidth);
                    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, m.__webglLineBuffer);
                    c.drawElements(c.LINES, m.__webglLineCount, c.UNSIGNED_SHORT, 0);
                } else {
                    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, m.__webglFaceBuffer);
                    c.drawElements(c.TRIANGLES, m.__webglFaceCount, c.UNSIGNED_SHORT, 0);
                }
            else if (w instanceof THREE.Line) {
                w = w.type == THREE.LineStrip ? c.LINE_STRIP : c.LINES;
                c.lineWidth(k.linewidth);
                c.drawArrays(w, 0, m.__webglLineCount);
            } else if (w instanceof THREE.ParticleSystem) c.drawArrays(c.POINTS, 0, m.__webglParticleCount);
            else w instanceof THREE.Ribbon && c.drawArrays(c.TRIANGLE_STRIP, 0, m.__webglVertexCount);
        }
    }
    function h(f, s, j) {
        if (!f.__webglVertexBuffer) f.__webglVertexBuffer = c.createBuffer();
        if (!f.__webglNormalBuffer) f.__webglNormalBuffer = c.createBuffer();
        if (f.hasPos) {
            c.bindBuffer(c.ARRAY_BUFFER, f.__webglVertexBuffer);
            c.bufferData(c.ARRAY_BUFFER, f.positionArray, c.DYNAMIC_DRAW);
            c.enableVertexAttribArray(s.attributes.position);
            c.vertexAttribPointer(s.attributes.position, 3, c.FLOAT, !1, 0, 0);
        }
        if (f.hasNormal) {
            c.bindBuffer(c.ARRAY_BUFFER, f.__webglNormalBuffer);
            if (j == THREE.FlatShading) {
                var k,
                    m,
                    w,
                    x,
                    u,
                    A,
                    t,
                    y,
                    z,
                    D,
                    B = f.count * 3;
                for (D = 0; D < B; D += 9) {
                    j = f.normalArray;
                    k = j[D];
                    m = j[D + 1];
                    w = j[D + 2];
                    x = j[D + 3];
                    A = j[D + 4];
                    y = j[D + 5];
                    u = j[D + 6];
                    t = j[D + 7];
                    z = j[D + 8];
                    k = (k + x + u) / 3;
                    m = (m + A + t) / 3;
                    w = (w + y + z) / 3;
                    j[D] = k;
                    j[D + 1] = m;
                    j[D + 2] = w;
                    j[D + 3] = k;
                    j[D + 4] = m;
                    j[D + 5] = w;
                    j[D + 6] = k;
                    j[D + 7] = m;
                    j[D + 8] = w;
                }
            }
            c.bufferData(c.ARRAY_BUFFER, f.normalArray, c.DYNAMIC_DRAW);
            c.enableVertexAttribArray(s.attributes.normal);
            c.vertexAttribPointer(s.attributes.normal, 3, c.FLOAT, !1, 0, 0);
        }
        c.drawArrays(c.TRIANGLES, 0, f.count);
        f.count = 0;
    }
    function o(f) {
        if (ma != f.doubleSided) {
            f.doubleSided ? c.disable(c.CULL_FACE) : c.enable(c.CULL_FACE);
            ma = f.doubleSided;
        }
        if (na != f.flipSided) {
            f.flipSided ? c.frontFace(c.CW) : c.frontFace(c.CCW);
            na = f.flipSided;
        }
    }
    function n(f) {
        if (Y != f) {
            f ? c.enable(c.DEPTH_TEST) : c.disable(c.DEPTH_TEST);
            Y = f;
        }
    }
    function p(f) {
        $[0].set(f.n41 - f.n11, f.n42 - f.n12, f.n43 - f.n13, f.n44 - f.n14);
        $[1].set(f.n41 + f.n11, f.n42 + f.n12, f.n43 + f.n13, f.n44 + f.n14);
        $[2].set(f.n41 + f.n21, f.n42 + f.n22, f.n43 + f.n23, f.n44 + f.n24);
        $[3].set(f.n41 - f.n21, f.n42 - f.n22, f.n43 - f.n23, f.n44 - f.n24);
        $[4].set(f.n41 - f.n31, f.n42 - f.n32, f.n43 - f.n33, f.n44 - f.n34);
        $[5].set(f.n41 + f.n31, f.n42 + f.n32, f.n43 + f.n33, f.n44 + f.n34);
        var s;
        for (f = 0; f < 6; f++) {
            s = $[f];
            s.divideScalar(Math.sqrt(s.x * s.x + s.y * s.y + s.z * s.z));
        }
    }
    function q(f) {
        for (var s = f.matrixWorld, j = -f.geometry.boundingSphere.radius * Math.max(f.scale.x, Math.max(f.scale.y, f.scale.z)), k = 0; k < 6; k++) {
            f = $[k].x * s.n14 + $[k].y * s.n24 + $[k].z * s.n34 + $[k].w;
            if (f <= j) return !1;
        }
        return !0;
    }
    function v(f, s) {
        f.list[f.count] = s;
        f.count += 1;
    }
    function E(f) {
        var s,
            j,
            k = f.object,
            m = f.opaque,
            w = f.transparent;
        w.count = 0;
        f = m.count = 0;
        for (s = k.materials.length; f < s; f++) {
            j = k.materials[f];
            j.transparent ? v(w, j) : v(m, j);
        }
    }
    function F(f) {
        var s,
            j,
            k,
            m,
            w = f.object,
            x = f.buffer,
            u = f.opaque,
            A = f.transparent;
        A.count = 0;
        f = u.count = 0;
        for (k = w.materials.length; f < k; f++) {
            s = w.materials[f];
            if (s instanceof THREE.MeshFaceMaterial) {
                s = 0;
                for (j = x.materials.length; s < j; s++) (m = x.materials[s]) && (m.transparent ? v(A, m) : v(u, m));
            } else (m = s) && (m.transparent ? v(A, m) : v(u, m));
        }
    }
    function H(f, s) {
        return s.z - f.z;
    }
    function I(f) {
        c.enable(c.POLYGON_OFFSET_FILL);
        c.polygonOffset(0.1, 1);
        c.enable(c.STENCIL_TEST);
        c.enable(c.DEPTH_TEST);
        c.depthMask(!1);
        c.colorMask(!1, !1, !1, !1);
        c.stencilFunc(c.ALWAYS, 1, 255);
        c.stencilOpSeparate(c.BACK, c.KEEP, c.INCR, c.KEEP);
        c.stencilOpSeparate(c.FRONT, c.KEEP, c.DECR, c.KEEP);
        var s,
            j = f.lights.length,
            k,
            m = f.lights,
            w = [],
            x,
            u,
            A,
            t,
            y,
            z = f.__webglShadowVolumes.length;
        for (s = 0; s < j; s++) {
            k = f.lights[s];
            if (k instanceof THREE.DirectionalLight) {
                w[0] = -k.position.x;
                w[1] = -k.position.y;
                w[2] = -k.position.z;
                for (y = 0; y < z; y++) {
                    k = f.__webglShadowVolumes[y].object;
                    x = f.__webglShadowVolumes[y].buffer;
                    u = k.materials[0];
                    u.program || aa.initMaterial(u, m, undefined, k);
                    u = u.program;
                    A = u.uniforms;
                    t = u.attributes;
                    if (ra !== u) {
                        c.useProgram(u);
                        ra = u;
                        c.uniformMatrix4fv(A.projectionMatrix, !1, Ta);
                        c.uniformMatrix4fv(A.viewMatrix, !1, Xa);
                        c.uniform3fv(A.directionalLightDirection, w);
                    }
                    k.matrixWorld.flattenToArray(k._objectMatrixArray);
                    c.uniformMatrix4fv(A.objectMatrix, !1, k._objectMatrixArray);
                    c.bindBuffer(c.ARRAY_BUFFER, x.__webglVertexBuffer);
                    c.vertexAttribPointer(t.position, 3, c.FLOAT, !1, 0, 0);
                    c.bindBuffer(c.ARRAY_BUFFER, x.__webglNormalBuffer);
                    c.vertexAttribPointer(t.normal, 3, c.FLOAT, !1, 0, 0);
                    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, x.__webglFaceBuffer);
                    c.cullFace(c.FRONT);
                    c.drawElements(c.TRIANGLES, x.__webglFaceCount, c.UNSIGNED_SHORT, 0);
                    c.cullFace(c.BACK);
                    c.drawElements(c.TRIANGLES, x.__webglFaceCount, c.UNSIGNED_SHORT, 0);
                }
            }
        }
        c.disable(c.POLYGON_OFFSET_FILL);
        c.colorMask(!0, !0, !0, !0);
        c.stencilFunc(c.NOTEQUAL, 0, 255);
        c.stencilOp(c.KEEP, c.KEEP, c.KEEP);
        c.disable(c.DEPTH_TEST);
        ga = '';
        ra = R.program;
        c.useProgram(R.program);
        c.uniformMatrix4fv(R.projectionLocation, !1, Ta);
        c.uniform1f(R.darknessLocation, R.darkness);
        c.bindBuffer(c.ARRAY_BUFFER, R.vertexBuffer);
        c.vertexAttribPointer(R.vertexLocation, 3, c.FLOAT, !1, 0, 0);
        c.enableVertexAttribArray(R.vertexLocation);
        c.blendFunc(c.ONE, c.ONE_MINUS_SRC_ALPHA);
        c.blendEquation(c.FUNC_ADD);
        c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, R.elementBuffer);
        c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0);
        c.disable(c.STENCIL_TEST);
        c.enable(c.DEPTH_TEST);
        c.depthMask(ta);
    }
    function M(f, s) {
        var j, k, m;
        j = _sprite.attributes;
        var w = _sprite.uniforms,
            x = za / ya,
            u,
            A = [],
            t = ya * 0.5,
            y = za * 0.5,
            z = !0;
        c.useProgram(_sprite.program);
        ra = _sprite.program;
        ga = '';
        if (!ob) {
            c.enableVertexAttribArray(_sprite.attributes.position);
            c.enableVertexAttribArray(_sprite.attributes.uv);
            ob = !0;
        }
        c.disable(c.CULL_FACE);
        c.enable(c.BLEND);
        c.depthMask(!0);
        c.bindBuffer(c.ARRAY_BUFFER, _sprite.vertexBuffer);
        c.vertexAttribPointer(j.position, 2, c.FLOAT, !1, 16, 0);
        c.vertexAttribPointer(j.uv, 2, c.FLOAT, !1, 16, 8);
        c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer);
        c.uniformMatrix4fv(w.projectionMatrix, !1, Ta);
        c.activeTexture(c.TEXTURE0);
        c.uniform1i(w.map, 0);
        j = 0;
        for (k = f.__webglSprites.length; j < k; j++) {
            m = f.__webglSprites[j];
            if (m.useScreenCoordinates) m.z = -m.position.z;
            else {
                m._modelViewMatrix.multiplyToArray(s.matrixWorldInverse, m.matrixWorld, m._modelViewMatrixArray);
                m.z = -m._modelViewMatrix.n34;
            }
        }
        f.__webglSprites.sort(H);
        j = 0;
        for (k = f.__webglSprites.length; j < k; j++) {
            m = f.__webglSprites[j];
            if (m.material === undefined && m.map && m.map.image && m.map.image.width) {
                if (m.useScreenCoordinates) {
                    c.uniform1i(w.useScreenCoordinates, 1);
                    c.uniform3f(w.screenPosition, (m.position.x - t) / t, (y - m.position.y) / y, Math.max(0, Math.min(1, m.position.z)));
                } else {
                    c.uniform1i(w.useScreenCoordinates, 0);
                    c.uniform1i(w.affectedByDistance, m.affectedByDistance ? 1 : 0);
                    c.uniformMatrix4fv(w.modelViewMatrix, !1, m._modelViewMatrixArray);
                }
                u = m.map.image.width / (m.affectedByDistance ? 1 : za);
                A[0] = u * x * m.scale.x;
                A[1] = u * m.scale.y;
                c.uniform2f(w.uvScale, m.uvScale.x, m.uvScale.y);
                c.uniform2f(w.uvOffset, m.uvOffset.x, m.uvOffset.y);
                c.uniform2f(w.alignment, m.alignment.x, m.alignment.y);
                c.uniform1f(w.opacity, m.opacity);
                c.uniform1f(w.rotation, m.rotation);
                c.uniform2fv(w.scale, A);
                if (m.mergeWith3D && !z) {
                    c.enable(c.DEPTH_TEST);
                    z = !0;
                } else if (!m.mergeWith3D && z) {
                    c.disable(c.DEPTH_TEST);
                    z = !1;
                }
                oa(m.blending);
                K(m.map, 0);
                c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0);
            }
        }
        c.enable(c.CULL_FACE);
        c.enable(c.DEPTH_TEST);
        c.depthMask(ta);
    }
    function N(f, s) {
        var j,
            k,
            m = f.__webglLensFlares.length,
            w,
            x,
            u,
            A = new THREE.Vector3(),
            t = za / ya,
            y = ya * 0.5,
            z = za * 0.5,
            D = 16 / za,
            B = [D * t, D],
            O = [1, 1, 0],
            W = [1, 1],
            P = J.uniforms;
        j = J.attributes;
        c.useProgram(J.program);
        ra = J.program;
        ga = '';
        if (!pb) {
            c.enableVertexAttribArray(J.attributes.vertex);
            c.enableVertexAttribArray(J.attributes.uv);
            pb = !0;
        }
        c.uniform1i(P.occlusionMap, 0);
        c.uniform1i(P.map, 1);
        c.bindBuffer(c.ARRAY_BUFFER, J.vertexBuffer);
        c.vertexAttribPointer(j.vertex, 2, c.FLOAT, !1, 16, 0);
        c.vertexAttribPointer(j.uv, 2, c.FLOAT, !1, 16, 8);
        c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, J.elementBuffer);
        c.disable(c.CULL_FACE);
        c.depthMask(!1);
        c.activeTexture(c.TEXTURE0);
        c.bindTexture(c.TEXTURE_2D, J.occlusionTexture);
        c.activeTexture(c.TEXTURE1);
        for (k = 0; k < m; k++) {
            j = f.__webglLensFlares[k].object;
            A.set(j.matrixWorld.n14, j.matrixWorld.n24, j.matrixWorld.n34);
            s.matrixWorldInverse.multiplyVector3(A);
            s.projectionMatrix.multiplyVector3(A);
            O[0] = A.x;
            O[1] = A.y;
            O[2] = A.z;
            W[0] = O[0] * y + y;
            W[1] = O[1] * z + z;
            if (J.hasVertexTexture || (W[0] > 0 && W[0] < ya && W[1] > 0 && W[1] < za)) {
                c.bindTexture(c.TEXTURE_2D, J.tempTexture);
                c.copyTexImage2D(c.TEXTURE_2D, 0, c.RGB, W[0] - 8, W[1] - 8, 16, 16, 0);
                c.uniform1i(P.renderType, 0);
                c.uniform2fv(P.scale, B);
                c.uniform3fv(P.screenPosition, O);
                c.disable(c.BLEND);
                c.enable(c.DEPTH_TEST);
                c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0);
                c.bindTexture(c.TEXTURE_2D, J.occlusionTexture);
                c.copyTexImage2D(c.TEXTURE_2D, 0, c.RGBA, W[0] - 8, W[1] - 8, 16, 16, 0);
                c.uniform1i(P.renderType, 1);
                c.disable(c.DEPTH_TEST);
                c.bindTexture(c.TEXTURE_2D, J.tempTexture);
                c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0);
                j.positionScreen.x = O[0];
                j.positionScreen.y = O[1];
                j.positionScreen.z = O[2];
                j.customUpdateCallback ? j.customUpdateCallback(j) : j.updateLensFlares();
                c.uniform1i(P.renderType, 2);
                c.enable(c.BLEND);
                w = 0;
                for (x = j.lensFlares.length; w < x; w++) {
                    u = j.lensFlares[w];
                    if (u.opacity > 0.001 && u.scale > 0.001) {
                        O[0] = u.x;
                        O[1] = u.y;
                        O[2] = u.z;
                        D = (u.size * u.scale) / za;
                        B[0] = D * t;
                        B[1] = D;
                        c.uniform3fv(P.screenPosition, O);
                        c.uniform2fv(P.scale, B);
                        c.uniform1f(P.rotation, u.rotation);
                        c.uniform1f(P.opacity, u.opacity);
                        oa(u.blending);
                        K(u.texture, 1);
                        c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0);
                    }
                }
            }
        }
        c.enable(c.CULL_FACE);
        c.enable(c.DEPTH_TEST);
        c.depthMask(ta);
    }
    function V(f, s) {
        f._modelViewMatrix.multiplyToArray(s.matrixWorldInverse, f.matrixWorld, f._modelViewMatrixArray);
        THREE.Matrix4.makeInvert3x3(f._modelViewMatrix).transposeIntoArray(f._normalMatrixArray);
    }
    function L(f) {
        var s, j, k, m, w;
        if (f instanceof THREE.Mesh) {
            j = f.geometry;
            for (s in j.geometryGroups) {
                k = j.geometryGroups[s];
                w = !1;
                for (m in k.__webglCustomAttributes)
                    if (k.__webglCustomAttributes[m].needsUpdate) {
                        w = !0;
                        break;
                    }
                if (j.__dirtyVertices || j.__dirtyMorphTargets || j.__dirtyElements || j.__dirtyUvs || j.__dirtyNormals || j.__dirtyColors || j.__dirtyTangents || w) {
                    w = c.DYNAMIC_DRAW;
                    var x = void 0,
                        u = void 0,
                        A = void 0,
                        t = void 0;
                    A = void 0;
                    var y = void 0,
                        z = void 0,
                        D = void 0,
                        B = void 0,
                        O = void 0,
                        W = void 0,
                        P = void 0,
                        X = void 0,
                        Ga = void 0,
                        T = void 0,
                        Q = void 0,
                        U = void 0,
                        ua = void 0;
                    z = void 0;
                    D = void 0;
                    t = void 0;
                    B = void 0;
                    t = void 0;
                    var r = void 0,
                        G = void 0;
                    z = void 0;
                    r = void 0;
                    G = void 0;
                    var i = void 0,
                        Ka = void 0;
                    r = void 0;
                    G = void 0;
                    i = void 0;
                    Ka = void 0;
                    r = void 0;
                    G = void 0;
                    i = void 0;
                    Ka = void 0;
                    r = void 0;
                    G = void 0;
                    i = void 0;
                    t = void 0;
                    B = void 0;
                    y = void 0;
                    A = void 0;
                    A = void 0;
                    r = void 0;
                    G = void 0;
                    i = void 0;
                    var Va = void 0,
                        va = 0,
                        Aa = 0,
                        Za = 0,
                        $a = 0,
                        Ja = 0,
                        La = 0,
                        ea = 0,
                        Ma = 0,
                        xa = 0,
                        C = 0,
                        Ba = 0;
                    G = r = 0;
                    var Ca = k.__vertexArray,
                        fb = k.__uvArray,
                        gb = k.__uv2Array,
                        Qa = k.__normalArray,
                        ha = k.__tangentArray,
                        Da = k.__colorArray,
                        ia = k.__skinVertexAArray,
                        ja = k.__skinVertexBArray,
                        ka = k.__skinIndexArray,
                        la = k.__skinWeightArray,
                        hb = k.__morphTargetsArrays,
                        Ra = k.__webglCustomAttributes;
                    i = void 0;
                    var Na = k.__faceArray,
                        Oa = k.__lineArray,
                        qb = k.__needsSmoothNormals;
                    W = k.__vertexColorType;
                    O = k.__uvType;
                    P = k.__normalType;
                    var Ha = f.geometry,
                        ib = Ha.__dirtyVertices,
                        jb = Ha.__dirtyElements,
                        eb = Ha.__dirtyUvs,
                        kb = Ha.__dirtyNormals,
                        lb = Ha.__dirtyTangents,
                        mb = Ha.__dirtyColors,
                        nb = Ha.__dirtyMorphTargets,
                        ab = Ha.vertices,
                        rb = k.faces,
                        ub = Ha.faces,
                        sb = Ha.faceVertexUvs[0],
                        tb = Ha.faceVertexUvs[1],
                        bb = Ha.skinVerticesA,
                        cb = Ha.skinVerticesB,
                        db = Ha.skinIndices,
                        Wa = Ha.skinWeights,
                        Ya = f instanceof THREE.ShadowVolume ? Ha.edgeFaces : undefined;
                    morphTargets = Ha.morphTargets;
                    if (Ra)
                        for (Va in Ra) {
                            Ra[Va].offset = 0;
                            Ra[Va].offsetSrc = 0;
                        }
                    x = 0;
                    for (u = rb.length; x < u; x++) {
                        A = rb[x];
                        t = ub[A];
                        sb && (X = sb[A]);
                        tb && (Ga = tb[A]);
                        A = t.vertexNormals;
                        y = t.normal;
                        z = t.vertexColors;
                        D = t.color;
                        B = t.vertexTangents;
                        if (t instanceof THREE.Face3) {
                            if (ib) {
                                T = ab[t.a].position;
                                Q = ab[t.b].position;
                                U = ab[t.c].position;
                                Ca[Aa] = T.x;
                                Ca[Aa + 1] = T.y;
                                Ca[Aa + 2] = T.z;
                                Ca[Aa + 3] = Q.x;
                                Ca[Aa + 4] = Q.y;
                                Ca[Aa + 5] = Q.z;
                                Ca[Aa + 6] = U.x;
                                Ca[Aa + 7] = U.y;
                                Ca[Aa + 8] = U.z;
                                Aa += 9;
                            }
                            if (Ra)
                                for (Va in Ra) {
                                    i = Ra[Va];
                                    if (i.needsUpdate) {
                                        r = i.offset;
                                        G = i.offsetSrc;
                                        if (i.size === 1) {
                                            if (i.boundTo === undefined || i.boundTo === 'vertices') {
                                                i.array[r + 0] = i.value[t.a];
                                                i.array[r + 1] = i.value[t.b];
                                                i.array[r + 2] = i.value[t.c];
                                            } else if (i.boundTo === 'faces') {
                                                i.array[r + 0] = i.value[G];
                                                i.array[r + 1] = i.value[G];
                                                i.array[r + 2] = i.value[G];
                                                i.offsetSrc++;
                                            } else if (i.boundTo === 'faceVertices') {
                                                i.array[r + 0] = i.value[G + 0];
                                                i.array[r + 1] = i.value[G + 1];
                                                i.array[r + 2] = i.value[G + 2];
                                                i.offsetSrc += 3;
                                            }
                                            i.offset += 3;
                                        } else {
                                            if (i.boundTo === undefined || i.boundTo === 'vertices') {
                                                T = i.value[t.a];
                                                Q = i.value[t.b];
                                                U = i.value[t.c];
                                            } else if (i.boundTo === 'faces') {
                                                T = i.value[G];
                                                Q = i.value[G];
                                                U = i.value[G];
                                                i.offsetSrc++;
                                            } else if (i.boundTo === 'faceVertices') {
                                                T = i.value[G + 0];
                                                Q = i.value[G + 1];
                                                U = i.value[G + 2];
                                                i.offsetSrc += 3;
                                            }
                                            if (i.size === 2) {
                                                i.array[r + 0] = T.x;
                                                i.array[r + 1] = T.y;
                                                i.array[r + 2] = Q.x;
                                                i.array[r + 3] = Q.y;
                                                i.array[r + 4] = U.x;
                                                i.array[r + 5] = U.y;
                                                i.offset += 6;
                                            } else if (i.size === 3) {
                                                if (i.type === 'c') {
                                                    i.array[r + 0] = T.r;
                                                    i.array[r + 1] = T.g;
                                                    i.array[r + 2] = T.b;
                                                    i.array[r + 3] = Q.r;
                                                    i.array[r + 4] = Q.g;
                                                    i.array[r + 5] = Q.b;
                                                    i.array[r + 6] = U.r;
                                                    i.array[r + 7] = U.g;
                                                    i.array[r + 8] = U.b;
                                                } else {
                                                    i.array[r + 0] = T.x;
                                                    i.array[r + 1] = T.y;
                                                    i.array[r + 2] = T.z;
                                                    i.array[r + 3] = Q.x;
                                                    i.array[r + 4] = Q.y;
                                                    i.array[r + 5] = Q.z;
                                                    i.array[r + 6] = U.x;
                                                    i.array[r + 7] = U.y;
                                                    i.array[r + 8] = U.z;
                                                }
                                                i.offset += 9;
                                            } else {
                                                i.array[r + 0] = T.x;
                                                i.array[r + 1] = T.y;
                                                i.array[r + 2] = T.z;
                                                i.array[r + 3] = T.w;
                                                i.array[r + 4] = Q.x;
                                                i.array[r + 5] = Q.y;
                                                i.array[r + 6] = Q.z;
                                                i.array[r + 7] = Q.w;
                                                i.array[r + 8] = U.x;
                                                i.array[r + 9] = U.y;
                                                i.array[r + 10] = U.z;
                                                i.array[r + 11] = U.w;
                                                i.offset += 12;
                                            }
                                        }
                                    }
                                }
                            if (nb) {
                                r = 0;
                                for (G = morphTargets.length; r < G; r++) {
                                    T = morphTargets[r].vertices[t.a].position;
                                    Q = morphTargets[r].vertices[t.b].position;
                                    U = morphTargets[r].vertices[t.c].position;
                                    i = hb[r];
                                    i[Ba + 0] = T.x;
                                    i[Ba + 1] = T.y;
                                    i[Ba + 2] = T.z;
                                    i[Ba + 3] = Q.x;
                                    i[Ba + 4] = Q.y;
                                    i[Ba + 5] = Q.z;
                                    i[Ba + 6] = U.x;
                                    i[Ba + 7] = U.y;
                                    i[Ba + 8] = U.z;
                                }
                                Ba += 9;
                            }
                            if (Wa.length) {
                                r = Wa[t.a];
                                G = Wa[t.b];
                                i = Wa[t.c];
                                la[C] = r.x;
                                la[C + 1] = r.y;
                                la[C + 2] = r.z;
                                la[C + 3] = r.w;
                                la[C + 4] = G.x;
                                la[C + 5] = G.y;
                                la[C + 6] = G.z;
                                la[C + 7] = G.w;
                                la[C + 8] = i.x;
                                la[C + 9] = i.y;
                                la[C + 10] = i.z;
                                la[C + 11] = i.w;
                                r = db[t.a];
                                G = db[t.b];
                                i = db[t.c];
                                ka[C] = r.x;
                                ka[C + 1] = r.y;
                                ka[C + 2] = r.z;
                                ka[C + 3] = r.w;
                                ka[C + 4] = G.x;
                                ka[C + 5] = G.y;
                                ka[C + 6] = G.z;
                                ka[C + 7] = G.w;
                                ka[C + 8] = i.x;
                                ka[C + 9] = i.y;
                                ka[C + 10] = i.z;
                                ka[C + 11] = i.w;
                                r = bb[t.a];
                                G = bb[t.b];
                                i = bb[t.c];
                                ia[C] = r.x;
                                ia[C + 1] = r.y;
                                ia[C + 2] = r.z;
                                ia[C + 3] = 1;
                                ia[C + 4] = G.x;
                                ia[C + 5] = G.y;
                                ia[C + 6] = G.z;
                                ia[C + 7] = 1;
                                ia[C + 8] = i.x;
                                ia[C + 9] = i.y;
                                ia[C + 10] = i.z;
                                ia[C + 11] = 1;
                                r = cb[t.a];
                                G = cb[t.b];
                                i = cb[t.c];
                                ja[C] = r.x;
                                ja[C + 1] = r.y;
                                ja[C + 2] = r.z;
                                ja[C + 3] = 1;
                                ja[C + 4] = G.x;
                                ja[C + 5] = G.y;
                                ja[C + 6] = G.z;
                                ja[C + 7] = 1;
                                ja[C + 8] = i.x;
                                ja[C + 9] = i.y;
                                ja[C + 10] = i.z;
                                ja[C + 11] = 1;
                                C += 12;
                            }
                            if (mb && W) {
                                if (z.length == 3 && W == THREE.VertexColors) {
                                    t = z[0];
                                    r = z[1];
                                    G = z[2];
                                } else G = r = t = D;
                                Da[xa] = t.r;
                                Da[xa + 1] = t.g;
                                Da[xa + 2] = t.b;
                                Da[xa + 3] = r.r;
                                Da[xa + 4] = r.g;
                                Da[xa + 5] = r.b;
                                Da[xa + 6] = G.r;
                                Da[xa + 7] = G.g;
                                Da[xa + 8] = G.b;
                                xa += 9;
                            }
                            if (lb && Ha.hasTangents) {
                                z = B[0];
                                D = B[1];
                                t = B[2];
                                ha[ea] = z.x;
                                ha[ea + 1] = z.y;
                                ha[ea + 2] = z.z;
                                ha[ea + 3] = z.w;
                                ha[ea + 4] = D.x;
                                ha[ea + 5] = D.y;
                                ha[ea + 6] = D.z;
                                ha[ea + 7] = D.w;
                                ha[ea + 8] = t.x;
                                ha[ea + 9] = t.y;
                                ha[ea + 10] = t.z;
                                ha[ea + 11] = t.w;
                                ea += 12;
                            }
                            if (kb && P)
                                if (A.length == 3 && qb)
                                    for (B = 0; B < 3; B++) {
                                        y = A[B];
                                        Qa[La] = y.x;
                                        Qa[La + 1] = y.y;
                                        Qa[La + 2] = y.z;
                                        La += 3;
                                    }
                                else
                                    for (B = 0; B < 3; B++) {
                                        Qa[La] = y.x;
                                        Qa[La + 1] = y.y;
                                        Qa[La + 2] = y.z;
                                        La += 3;
                                    }
                            if (eb && X !== undefined && O)
                                for (B = 0; B < 3; B++) {
                                    A = X[B];
                                    fb[Za] = A.u;
                                    fb[Za + 1] = A.v;
                                    Za += 2;
                                }
                            if (eb && Ga !== undefined && O)
                                for (B = 0; B < 3; B++) {
                                    A = Ga[B];
                                    gb[$a] = A.u;
                                    gb[$a + 1] = A.v;
                                    $a += 2;
                                }
                            if (jb) {
                                Na[Ja] = va;
                                Na[Ja + 1] = va + 1;
                                Na[Ja + 2] = va + 2;
                                Ja += 3;
                                Oa[Ma] = va;
                                Oa[Ma + 1] = va + 1;
                                Oa[Ma + 2] = va;
                                Oa[Ma + 3] = va + 2;
                                Oa[Ma + 4] = va + 1;
                                Oa[Ma + 5] = va + 2;
                                Ma += 6;
                                va += 3;
                            }
                        } else if (t instanceof THREE.Face4) {
                            if (ib) {
                                T = ab[t.a].position;
                                Q = ab[t.b].position;
                                U = ab[t.c].position;
                                ua = ab[t.d].position;
                                Ca[Aa] = T.x;
                                Ca[Aa + 1] = T.y;
                                Ca[Aa + 2] = T.z;
                                Ca[Aa + 3] = Q.x;
                                Ca[Aa + 4] = Q.y;
                                Ca[Aa + 5] = Q.z;
                                Ca[Aa + 6] = U.x;
                                Ca[Aa + 7] = U.y;
                                Ca[Aa + 8] = U.z;
                                Ca[Aa + 9] = ua.x;
                                Ca[Aa + 10] = ua.y;
                                Ca[Aa + 11] = ua.z;
                                Aa += 12;
                            }
                            if (Ra)
                                for (Va in Ra) {
                                    i = Ra[Va];
                                    if (i.needsUpdate) {
                                        r = i.offset;
                                        G = i.offsetSrc;
                                        if (i.size === 1) {
                                            if (i.boundTo === undefined || i.boundTo === 'vertices') {
                                                i.array[r + 0] = i.value[t.a];
                                                i.array[r + 1] = i.value[t.b];
                                                i.array[r + 2] = i.value[t.c];
                                                i.array[r + 2] = i.value[t.d];
                                            } else if (i.boundTo === 'faces') {
                                                i.array[r + 0] = i.value[G];
                                                i.array[r + 1] = i.value[G];
                                                i.array[r + 2] = i.value[G];
                                                i.array[r + 2] = i.value[G];
                                                i.offsetSrc++;
                                            } else if (i.boundTo === 'faceVertices') {
                                                i.array[r + 0] = i.value[G + 0];
                                                i.array[r + 1] = i.value[G + 1];
                                                i.array[r + 2] = i.value[G + 2];
                                                i.array[r + 2] = i.value[G + 3];
                                                i.offsetSrc += 4;
                                            }
                                            i.offset += 4;
                                        } else {
                                            if (i.boundTo === undefined || i.boundTo === 'vertices') {
                                                T = i.value[t.a];
                                                Q = i.value[t.b];
                                                U = i.value[t.c];
                                                ua = i.value[t.d];
                                            } else if (i.boundTo === 'faces') {
                                                T = i.value[G];
                                                Q = i.value[G];
                                                U = i.value[G];
                                                ua = i.value[G];
                                                i.offsetSrc++;
                                            } else if (i.boundTo === 'faceVertices') {
                                                T = i.value[G + 0];
                                                Q = i.value[G + 1];
                                                U = i.value[G + 2];
                                                ua = i.value[G + 3];
                                                i.offsetSrc += 4;
                                            }
                                            if (i.size === 2) {
                                                i.array[r + 0] = T.x;
                                                i.array[r + 1] = T.y;
                                                i.array[r + 2] = Q.x;
                                                i.array[r + 3] = Q.y;
                                                i.array[r + 4] = U.x;
                                                i.array[r + 5] = U.y;
                                                i.array[r + 6] = ua.x;
                                                i.array[r + 7] = ua.y;
                                                i.offset += 8;
                                            } else if (i.size === 3) {
                                                if (i.type === 'c') {
                                                    i.array[r + 0] = T.r;
                                                    i.array[r + 1] = T.g;
                                                    i.array[r + 2] = T.b;
                                                    i.array[r + 3] = Q.r;
                                                    i.array[r + 4] = Q.g;
                                                    i.array[r + 5] = Q.b;
                                                    i.array[r + 6] = U.r;
                                                    i.array[r + 7] = U.g;
                                                    i.array[r + 8] = U.b;
                                                    i.array[r + 9] = ua.r;
                                                    i.array[r + 10] = ua.g;
                                                    i.array[r + 11] = ua.b;
                                                } else {
                                                    i.array[r + 0] = T.x;
                                                    i.array[r + 1] = T.y;
                                                    i.array[r + 2] = T.z;
                                                    i.array[r + 3] = Q.x;
                                                    i.array[r + 4] = Q.y;
                                                    i.array[r + 5] = Q.z;
                                                    i.array[r + 6] = U.x;
                                                    i.array[r + 7] = U.y;
                                                    i.array[r + 8] = U.z;
                                                    i.array[r + 9] = ua.x;
                                                    i.array[r + 10] = ua.y;
                                                    i.array[r + 11] = ua.z;
                                                }
                                                i.offset += 12;
                                            } else {
                                                i.array[r + 0] = T.x;
                                                i.array[r + 1] = T.y;
                                                i.array[r + 2] = T.z;
                                                i.array[r + 3] = T.w;
                                                i.array[r + 4] = Q.x;
                                                i.array[r + 5] = Q.y;
                                                i.array[r + 6] = Q.z;
                                                i.array[r + 7] = Q.w;
                                                i.array[r + 8] = U.x;
                                                i.array[r + 9] = U.y;
                                                i.array[r + 10] = U.z;
                                                i.array[r + 11] = U.w;
                                                i.array[r + 12] = ua.x;
                                                i.array[r + 13] = ua.y;
                                                i.array[r + 14] = ua.z;
                                                i.array[r + 15] = ua.w;
                                                i.offset += 16;
                                            }
                                        }
                                    }
                                }
                            if (nb) {
                                r = 0;
                                for (G = morphTargets.length; r < G; r++) {
                                    T = morphTargets[r].vertices[t.a].position;
                                    Q = morphTargets[r].vertices[t.b].position;
                                    U = morphTargets[r].vertices[t.c].position;
                                    ua = morphTargets[r].vertices[t.d].position;
                                    i = hb[r];
                                    i[Ba + 0] = T.x;
                                    i[Ba + 1] = T.y;
                                    i[Ba + 2] = T.z;
                                    i[Ba + 3] = Q.x;
                                    i[Ba + 4] = Q.y;
                                    i[Ba + 5] = Q.z;
                                    i[Ba + 6] = U.x;
                                    i[Ba + 7] = U.y;
                                    i[Ba + 8] = U.z;
                                    i[Ba + 9] = ua.x;
                                    i[Ba + 10] = ua.y;
                                    i[Ba + 11] = ua.z;
                                }
                                Ba += 12;
                            }
                            if (Wa.length) {
                                r = Wa[t.a];
                                G = Wa[t.b];
                                i = Wa[t.c];
                                Ka = Wa[t.d];
                                la[C] = r.x;
                                la[C + 1] = r.y;
                                la[C + 2] = r.z;
                                la[C + 3] = r.w;
                                la[C + 4] = G.x;
                                la[C + 5] = G.y;
                                la[C + 6] = G.z;
                                la[C + 7] = G.w;
                                la[C + 8] = i.x;
                                la[C + 9] = i.y;
                                la[C + 10] = i.z;
                                la[C + 11] = i.w;
                                la[C + 12] = Ka.x;
                                la[C + 13] = Ka.y;
                                la[C + 14] = Ka.z;
                                la[C + 15] = Ka.w;
                                r = db[t.a];
                                G = db[t.b];
                                i = db[t.c];
                                Ka = db[t.d];
                                ka[C] = r.x;
                                ka[C + 1] = r.y;
                                ka[C + 2] = r.z;
                                ka[C + 3] = r.w;
                                ka[C + 4] = G.x;
                                ka[C + 5] = G.y;
                                ka[C + 6] = G.z;
                                ka[C + 7] = G.w;
                                ka[C + 8] = i.x;
                                ka[C + 9] = i.y;
                                ka[C + 10] = i.z;
                                ka[C + 11] = i.w;
                                ka[C + 12] = Ka.x;
                                ka[C + 13] = Ka.y;
                                ka[C + 14] = Ka.z;
                                ka[C + 15] = Ka.w;
                                r = bb[t.a];
                                G = bb[t.b];
                                i = bb[t.c];
                                Ka = bb[t.d];
                                ia[C] = r.x;
                                ia[C + 1] = r.y;
                                ia[C + 2] = r.z;
                                ia[C + 3] = 1;
                                ia[C + 4] = G.x;
                                ia[C + 5] = G.y;
                                ia[C + 6] = G.z;
                                ia[C + 7] = 1;
                                ia[C + 8] = i.x;
                                ia[C + 9] = i.y;
                                ia[C + 10] = i.z;
                                ia[C + 11] = 1;
                                ia[C + 12] = Ka.x;
                                ia[C + 13] = Ka.y;
                                ia[C + 14] = Ka.z;
                                ia[C + 15] = 1;
                                r = cb[t.a];
                                G = cb[t.b];
                                i = cb[t.c];
                                t = cb[t.d];
                                ja[C] = r.x;
                                ja[C + 1] = r.y;
                                ja[C + 2] = r.z;
                                ja[C + 3] = 1;
                                ja[C + 4] = G.x;
                                ja[C + 5] = G.y;
                                ja[C + 6] = G.z;
                                ja[C + 7] = 1;
                                ja[C + 8] = i.x;
                                ja[C + 9] = i.y;
                                ja[C + 10] = i.z;
                                ja[C + 11] = 1;
                                ja[C + 12] = t.x;
                                ja[C + 13] = t.y;
                                ja[C + 14] = t.z;
                                ja[C + 15] = 1;
                                C += 16;
                            }
                            if (mb && W) {
                                if (z.length == 4 && W == THREE.VertexColors) {
                                    t = z[0];
                                    r = z[1];
                                    G = z[2];
                                    z = z[3];
                                } else z = G = r = t = D;
                                Da[xa] = t.r;
                                Da[xa + 1] = t.g;
                                Da[xa + 2] = t.b;
                                Da[xa + 3] = r.r;
                                Da[xa + 4] = r.g;
                                Da[xa + 5] = r.b;
                                Da[xa + 6] = G.r;
                                Da[xa + 7] = G.g;
                                Da[xa + 8] = G.b;
                                Da[xa + 9] = z.r;
                                Da[xa + 10] = z.g;
                                Da[xa + 11] = z.b;
                                xa += 12;
                            }
                            if (lb && Ha.hasTangents) {
                                z = B[0];
                                D = B[1];
                                t = B[2];
                                B = B[3];
                                ha[ea] = z.x;
                                ha[ea + 1] = z.y;
                                ha[ea + 2] = z.z;
                                ha[ea + 3] = z.w;
                                ha[ea + 4] = D.x;
                                ha[ea + 5] = D.y;
                                ha[ea + 6] = D.z;
                                ha[ea + 7] = D.w;
                                ha[ea + 8] = t.x;
                                ha[ea + 9] = t.y;
                                ha[ea + 10] = t.z;
                                ha[ea + 11] = t.w;
                                ha[ea + 12] = B.x;
                                ha[ea + 13] = B.y;
                                ha[ea + 14] = B.z;
                                ha[ea + 15] = B.w;
                                ea += 16;
                            }
                            if (kb && P)
                                if (A.length == 4 && qb)
                                    for (B = 0; B < 4; B++) {
                                        y = A[B];
                                        Qa[La] = y.x;
                                        Qa[La + 1] = y.y;
                                        Qa[La + 2] = y.z;
                                        La += 3;
                                    }
                                else
                                    for (B = 0; B < 4; B++) {
                                        Qa[La] = y.x;
                                        Qa[La + 1] = y.y;
                                        Qa[La + 2] = y.z;
                                        La += 3;
                                    }
                            if (eb && X !== undefined && O)
                                for (B = 0; B < 4; B++) {
                                    A = X[B];
                                    fb[Za] = A.u;
                                    fb[Za + 1] = A.v;
                                    Za += 2;
                                }
                            if (eb && Ga !== undefined && O)
                                for (B = 0; B < 4; B++) {
                                    A = Ga[B];
                                    gb[$a] = A.u;
                                    gb[$a + 1] = A.v;
                                    $a += 2;
                                }
                            if (jb) {
                                Na[Ja] = va;
                                Na[Ja + 1] = va + 1;
                                Na[Ja + 2] = va + 3;
                                Na[Ja + 3] = va + 1;
                                Na[Ja + 4] = va + 2;
                                Na[Ja + 5] = va + 3;
                                Ja += 6;
                                Oa[Ma] = va;
                                Oa[Ma + 1] = va + 1;
                                Oa[Ma + 2] = va;
                                Oa[Ma + 3] = va + 3;
                                Oa[Ma + 4] = va + 1;
                                Oa[Ma + 5] = va + 2;
                                Oa[Ma + 6] = va + 2;
                                Oa[Ma + 7] = va + 3;
                                Ma += 8;
                                va += 4;
                            }
                        }
                    }
                    if (Ya) {
                        x = 0;
                        for (u = Ya.length; x < u; x++) {
                            Na[Ja] = Ya[x].a;
                            Na[Ja + 1] = Ya[x].b;
                            Na[Ja + 2] = Ya[x].c;
                            Na[Ja + 3] = Ya[x].a;
                            Na[Ja + 4] = Ya[x].c;
                            Na[Ja + 5] = Ya[x].d;
                            Ja += 6;
                        }
                    }
                    if (ib) {
                        c.bindBuffer(c.ARRAY_BUFFER, k.__webglVertexBuffer);
                        c.bufferData(c.ARRAY_BUFFER, Ca, w);
                    }
                    if (Ra)
                        for (Va in Ra) {
                            i = Ra[Va];
                            if (i.needsUpdate) {
                                c.bindBuffer(c.ARRAY_BUFFER, i.buffer);
                                c.bufferData(c.ARRAY_BUFFER, i.array, w);
                                i.needsUpdate = !1;
                            }
                        }
                    if (nb) {
                        r = 0;
                        for (G = morphTargets.length; r < G; r++) {
                            c.bindBuffer(c.ARRAY_BUFFER, k.__webglMorphTargetsBuffers[r]);
                            c.bufferData(c.ARRAY_BUFFER, hb[r], w);
                        }
                    }
                    if (mb && xa > 0) {
                        c.bindBuffer(c.ARRAY_BUFFER, k.__webglColorBuffer);
                        c.bufferData(c.ARRAY_BUFFER, Da, w);
                    }
                    if (kb) {
                        c.bindBuffer(c.ARRAY_BUFFER, k.__webglNormalBuffer);
                        c.bufferData(c.ARRAY_BUFFER, Qa, w);
                    }
                    if (lb && Ha.hasTangents) {
                        c.bindBuffer(c.ARRAY_BUFFER, k.__webglTangentBuffer);
                        c.bufferData(c.ARRAY_BUFFER, ha, w);
                    }
                    if (eb && Za > 0) {
                        c.bindBuffer(c.ARRAY_BUFFER, k.__webglUVBuffer);
                        c.bufferData(c.ARRAY_BUFFER, fb, w);
                    }
                    if (eb && $a > 0) {
                        c.bindBuffer(c.ARRAY_BUFFER, k.__webglUV2Buffer);
                        c.bufferData(c.ARRAY_BUFFER, gb, w);
                    }
                    if (jb) {
                        c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, k.__webglFaceBuffer);
                        c.bufferData(c.ELEMENT_ARRAY_BUFFER, Na, w);
                        c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, k.__webglLineBuffer);
                        c.bufferData(c.ELEMENT_ARRAY_BUFFER, Oa, w);
                    }
                    if (C > 0) {
                        c.bindBuffer(c.ARRAY_BUFFER, k.__webglSkinVertexABuffer);
                        c.bufferData(c.ARRAY_BUFFER, ia, w);
                        c.bindBuffer(c.ARRAY_BUFFER, k.__webglSkinVertexBBuffer);
                        c.bufferData(c.ARRAY_BUFFER, ja, w);
                        c.bindBuffer(c.ARRAY_BUFFER, k.__webglSkinIndicesBuffer);
                        c.bufferData(c.ARRAY_BUFFER, ka, w);
                        c.bindBuffer(c.ARRAY_BUFFER, k.__webglSkinWeightsBuffer);
                        c.bufferData(c.ARRAY_BUFFER, la, w);
                    }
                }
            }
            j.__dirtyVertices = !1;
            j.__dirtyMorphTargets = !1;
            j.__dirtyElements = !1;
            j.__dirtyUvs = !1;
            j.__dirtyNormals = !1;
            j.__dirtyTangents = !1;
            j.__dirtyColors = !1;
        } else if (f instanceof THREE.Ribbon) {
            j = f.geometry;
            if (j.__dirtyVertices || j.__dirtyColors) {
                f = j;
                s = c.DYNAMIC_DRAW;
                W = f.vertices;
                k = f.colors;
                P = W.length;
                w = k.length;
                X = f.__vertexArray;
                x = f.__colorArray;
                Ga = f.__dirtyColors;
                if (f.__dirtyVertices) {
                    for (u = 0; u < P; u++) {
                        O = W[u].position;
                        m = u * 3;
                        X[m] = O.x;
                        X[m + 1] = O.y;
                        X[m + 2] = O.z;
                    }
                    c.bindBuffer(c.ARRAY_BUFFER, f.__webglVertexBuffer);
                    c.bufferData(c.ARRAY_BUFFER, X, s);
                }
                if (Ga) {
                    for (u = 0; u < w; u++) {
                        color = k[u];
                        m = u * 3;
                        x[m] = color.r;
                        x[m + 1] = color.g;
                        x[m + 2] = color.b;
                    }
                    c.bindBuffer(c.ARRAY_BUFFER, f.__webglColorBuffer);
                    c.bufferData(c.ARRAY_BUFFER, x, s);
                }
            }
            j.__dirtyVertices = !1;
            j.__dirtyColors = !1;
        } else if (f instanceof THREE.Line) {
            j = f.geometry;
            if (j.__dirtyVertices || j.__dirtyColors) {
                f = j;
                s = c.DYNAMIC_DRAW;
                W = f.vertices;
                k = f.colors;
                P = W.length;
                w = k.length;
                X = f.__vertexArray;
                x = f.__colorArray;
                Ga = f.__dirtyColors;
                if (f.__dirtyVertices) {
                    for (u = 0; u < P; u++) {
                        O = W[u].position;
                        m = u * 3;
                        X[m] = O.x;
                        X[m + 1] = O.y;
                        X[m + 2] = O.z;
                    }
                    c.bindBuffer(c.ARRAY_BUFFER, f.__webglVertexBuffer);
                    c.bufferData(c.ARRAY_BUFFER, X, s);
                }
                if (Ga) {
                    for (u = 0; u < w; u++) {
                        color = k[u];
                        m = u * 3;
                        x[m] = color.r;
                        x[m + 1] = color.g;
                        x[m + 2] = color.b;
                    }
                    c.bindBuffer(c.ARRAY_BUFFER, f.__webglColorBuffer);
                    c.bufferData(c.ARRAY_BUFFER, x, s);
                }
            }
            j.__dirtyVertices = !1;
            j.__dirtyColors = !1;
        } else if (f instanceof THREE.ParticleSystem) {
            j = f.geometry;
            (j.__dirtyVertices || j.__dirtyColors || f.sortParticles) && d(j, c.DYNAMIC_DRAW, f);
            j.__dirtyVertices = !1;
            j.__dirtyColors = !1;
        }
    }
    function sa(f) {
        function s(D) {
            var B = [];
            j = 0;
            for (k = D.length; j < k; j++) D[j] == undefined ? B.push('undefined') : B.push(D[j].id);
            return B.join('_');
        }
        var j,
            k,
            m,
            w,
            x,
            u,
            A,
            t,
            y = {},
            z = f.morphTargets !== undefined ? f.morphTargets.length : 0;
        f.geometryGroups = {};
        m = 0;
        for (w = f.faces.length; m < w; m++) {
            x = f.faces[m];
            u = x.materials;
            A = s(u);
            y[A] == undefined && (y[A] = { hash: A, counter: 0 });
            t = y[A].hash + '_' + y[A].counter;
            f.geometryGroups[t] == undefined && (f.geometryGroups[t] = { faces: [], materials: u, vertices: 0, numMorphTargets: z });
            x = x instanceof THREE.Face3 ? 3 : 4;
            if (f.geometryGroups[t].vertices + x > 65535) {
                y[A].counter += 1;
                t = y[A].hash + '_' + y[A].counter;
                f.geometryGroups[t] == undefined && (f.geometryGroups[t] = { faces: [], materials: u, vertices: 0, numMorphTargets: z });
            }
            f.geometryGroups[t].faces.push(m);
            f.geometryGroups[t].vertices += x;
        }
    }
    function da(f, s, j) {
        f.push({ buffer: s, object: j, opaque: { list: [], count: 0 }, transparent: { list: [], count: 0 } });
    }
    function oa(f) {
        if (f != ga) {
            switch (f) {
                case THREE.AdditiveBlending:
                    c.blendEquation(c.FUNC_ADD);
                    c.blendFunc(c.SRC_ALPHA, c.ONE);
                    break;
                case THREE.SubtractiveBlending:
                    c.blendEquation(c.FUNC_ADD);
                    c.blendFunc(c.ZERO, c.ONE_MINUS_SRC_COLOR);
                    break;
                case THREE.MultiplyBlending:
                    c.blendEquation(c.FUNC_ADD);
                    c.blendFunc(c.ZERO, c.SRC_COLOR);
                    break;
                default:
                    c.blendEquationSeparate(c.FUNC_ADD, c.FUNC_ADD);
                    c.blendFuncSeparate(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA, c.ONE, c.ONE_MINUS_SRC_ALPHA);
            }
            ga = f;
        }
    }
    function Z(f, s, j) {
        if ((j.width & (j.width - 1)) == 0 && (j.height & (j.height - 1)) == 0) {
            c.texParameteri(f, c.TEXTURE_WRAP_S, fa(s.wrapS));
            c.texParameteri(f, c.TEXTURE_WRAP_T, fa(s.wrapT));
            c.texParameteri(f, c.TEXTURE_MAG_FILTER, fa(s.magFilter));
            c.texParameteri(f, c.TEXTURE_MIN_FILTER, fa(s.minFilter));
            c.generateMipmap(f);
        } else {
            c.texParameteri(f, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
            c.texParameteri(f, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
            c.texParameteri(f, c.TEXTURE_MAG_FILTER, Ea(s.magFilter));
            c.texParameteri(f, c.TEXTURE_MIN_FILTER, Ea(s.minFilter));
        }
    }
    function K(f, s) {
        if (f.needsUpdate) {
            if (f.__webglInit) {
                c.bindTexture(c.TEXTURE_2D, f.__webglTexture);
                c.texSubImage2D(c.TEXTURE_2D, 0, 0, 0, c.RGBA, c.UNSIGNED_BYTE, f.image);
            } else {
                f.__webglTexture = c.createTexture();
                c.bindTexture(c.TEXTURE_2D, f.__webglTexture);
                c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, f.image);
                f.__webglInit = !0;
            }
            Z(c.TEXTURE_2D, f, f.image);
            c.bindTexture(c.TEXTURE_2D, null);
            f.needsUpdate = !1;
        }
        c.activeTexture(c.TEXTURE0 + s);
        c.bindTexture(c.TEXTURE_2D, f.__webglTexture);
    }
    function Ia(f) {
        if (f && !f.__webglFramebuffer) {
            if (f.depthBuffer === undefined) f.depthBuffer = !0;
            if (f.stencilBuffer === undefined) f.stencilBuffer = !0;
            f.__webglFramebuffer = c.createFramebuffer();
            f.__webglRenderbuffer = c.createRenderbuffer();
            f.__webglTexture = c.createTexture();
            c.bindTexture(c.TEXTURE_2D, f.__webglTexture);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, fa(f.wrapS));
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, fa(f.wrapT));
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, fa(f.magFilter));
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, fa(f.minFilter));
            c.texImage2D(c.TEXTURE_2D, 0, fa(f.format), f.width, f.height, 0, fa(f.format), fa(f.type), null);
            c.bindRenderbuffer(c.RENDERBUFFER, f.__webglRenderbuffer);
            c.bindFramebuffer(c.FRAMEBUFFER, f.__webglFramebuffer);
            c.framebufferTexture2D(c.FRAMEBUFFER, c.COLOR_ATTACHMENT0, c.TEXTURE_2D, f.__webglTexture, 0);
            if (f.depthBuffer && !f.stencilBuffer) {
                c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_COMPONENT16, f.width, f.height);
                c.framebufferRenderbuffer(c.FRAMEBUFFER, c.DEPTH_ATTACHMENT, c.RENDERBUFFER, f.__webglRenderbuffer);
            } else if (f.depthBuffer && f.stencilBuffer) {
                c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_STENCIL, f.width, f.height);
                c.framebufferRenderbuffer(c.FRAMEBUFFER, c.DEPTH_STENCIL_ATTACHMENT, c.RENDERBUFFER, f.__webglRenderbuffer);
            } else c.renderbufferStorage(c.RENDERBUFFER, c.RGBA4, f.width, f.height);
            c.bindTexture(c.TEXTURE_2D, null);
            c.bindRenderbuffer(c.RENDERBUFFER, null);
            c.bindFramebuffer(c.FRAMEBUFFER, null);
        }
        var s, j;
        if (f) {
            s = f.__webglFramebuffer;
            j = f.width;
            f = f.height;
        } else {
            s = null;
            j = ya;
            f = za;
        }
        if (s != Fa) {
            c.bindFramebuffer(c.FRAMEBUFFER, s);
            c.viewport(wa, qa, j, f);
            Fa = s;
        }
    }
    function ca(f, s) {
        var j;
        if (f == 'fragment') j = c.createShader(c.FRAGMENT_SHADER);
        else f == 'vertex' && (j = c.createShader(c.VERTEX_SHADER));
        c.shaderSource(j, s);
        c.compileShader(j);
        if (!c.getShaderParameter(j, c.COMPILE_STATUS)) {
            console.error(c.getShaderInfoLog(j));
            console.error(s);
            return null;
        }
        return j;
    }
    function Ea(f) {
        switch (f) {
            case THREE.NearestFilter:
            case THREE.NearestMipMapNearestFilter:
            case THREE.NearestMipMapLinearFilter:
                return c.NEAREST;
            default:
                return c.LINEAR;
        }
    }
    function fa(f) {
        switch (f) {
            case THREE.RepeatWrapping:
                return c.REPEAT;
            case THREE.ClampToEdgeWrapping:
                return c.CLAMP_TO_EDGE;
            case THREE.MirroredRepeatWrapping:
                return c.MIRRORED_REPEAT;
            case THREE.NearestFilter:
                return c.NEAREST;
            case THREE.NearestMipMapNearestFilter:
                return c.NEAREST_MIPMAP_NEAREST;
            case THREE.NearestMipMapLinearFilter:
                return c.NEAREST_MIPMAP_LINEAR;
            case THREE.LinearFilter:
                return c.LINEAR;
            case THREE.LinearMipMapNearestFilter:
                return c.LINEAR_MIPMAP_NEAREST;
            case THREE.LinearMipMapLinearFilter:
                return c.LINEAR_MIPMAP_LINEAR;
            case THREE.ByteType:
                return c.BYTE;
            case THREE.UnsignedByteType:
                return c.UNSIGNED_BYTE;
            case THREE.ShortType:
                return c.SHORT;
            case THREE.UnsignedShortType:
                return c.UNSIGNED_SHORT;
            case THREE.IntType:
                return c.INT;
            case THREE.UnsignedShortType:
                return c.UNSIGNED_INT;
            case THREE.FloatType:
                return c.FLOAT;
            case THREE.AlphaFormat:
                return c.ALPHA;
            case THREE.RGBFormat:
                return c.RGB;
            case THREE.RGBAFormat:
                return c.RGBA;
            case THREE.LuminanceFormat:
                return c.LUMINANCE;
            case THREE.LuminanceAlphaFormat:
                return c.LUMINANCE_ALPHA;
        }
        return 0;
    }
    var c,
        S = document.createElement('canvas'),
        pa = [],
        ra = null,
        Fa = null,
        ta = !0,
        aa = this,
        ma = null,
        na = null,
        ga = null,
        Y = null,
        wa = 0,
        qa = 0,
        ya = 0,
        za = 0,
        $ = [new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4()],
        Pa = new THREE.Matrix4(),
        Ta = new Float32Array(16),
        Xa = new Float32Array(16),
        Ua = new THREE.Vector4(),
        Sa = { ambient: [0, 0, 0], directional: { length: 0, colors: [], positions: [] }, point: { length: 0, colors: [], positions: [], distances: [] } };
    b = b || {};
    stencil = b.stencil !== undefined ? b.stencil : !0;
    antialias = b.antialias !== undefined ? b.antialias : !1;
    clearColor = b.clearColor !== undefined ? new THREE.Color(b.clearColor) : new THREE.Color(0);
    clearAlpha = b.clearAlpha !== undefined ? b.clearAlpha : 0;
    this.maxMorphTargets = 8;
    this.domElement = S;
    this.autoClear = !0;
    this.sortObjects = !0;
    (function (f, s, j, k) {
        try {
            if (!(c = S.getContext('experimental-webgl', { antialias: f, stencil: k }))) throw 'Error creating WebGL context.';
        } catch (m) {
            console.error(m);
        }
        console.log(navigator.userAgent + ' | ' + c.getParameter(c.VERSION) + ' | ' + c.getParameter(c.VENDOR) + ' | ' + c.getParameter(c.RENDERER) + ' | ' + c.getParameter(c.SHADING_LANGUAGE_VERSION));
        c.clearColor(0, 0, 0, 1);
        c.clearDepth(1);
        c.enable(c.DEPTH_TEST);
        c.depthFunc(c.LEQUAL);
        c.frontFace(c.CCW);
        c.cullFace(c.BACK);
        c.enable(c.CULL_FACE);
        c.enable(c.BLEND);
        c.blendEquation(c.FUNC_ADD);
        c.blendFunc(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA);
        c.clearColor(s.r, s.g, s.b, j);
    })(antialias, clearColor, clearAlpha, stencil);
    this.context = c;
    if (stencil) {
        var R = {};
        R.vertices = new Float32Array(12);
        R.faces = new Uint16Array(6);
        R.darkness = 0.5;
        R.vertices[0] = -20;
        R.vertices[1] = -20;
        R.vertices[2] = -1;
        R.vertices[3] = 20;
        R.vertices[4] = -20;
        R.vertices[5] = -1;
        R.vertices[6] = 20;
        R.vertices[7] = 20;
        R.vertices[8] = -1;
        R.vertices[9] = -20;
        R.vertices[10] = 20;
        R.vertices[11] = -1;
        R.faces[0] = 0;
        R.faces[1] = 1;
        R.faces[2] = 2;
        R.faces[3] = 0;
        R.faces[4] = 2;
        R.faces[5] = 3;
        R.vertexBuffer = c.createBuffer();
        R.elementBuffer = c.createBuffer();
        c.bindBuffer(c.ARRAY_BUFFER, R.vertexBuffer);
        c.bufferData(c.ARRAY_BUFFER, R.vertices, c.STATIC_DRAW);
        c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, R.elementBuffer);
        c.bufferData(c.ELEMENT_ARRAY_BUFFER, R.faces, c.STATIC_DRAW);
        R.program = c.createProgram();
        c.attachShader(R.program, ca('fragment', THREE.ShaderLib.shadowPost.fragmentShader));
        c.attachShader(R.program, ca('vertex', THREE.ShaderLib.shadowPost.vertexShader));
        c.linkProgram(R.program);
        R.vertexLocation = c.getAttribLocation(R.program, 'position');
        R.projectionLocation = c.getUniformLocation(R.program, 'projectionMatrix');
        R.darknessLocation = c.getUniformLocation(R.program, 'darkness');
    }
    var J = {};
    J.vertices = new Float32Array(16);
    J.faces = new Uint16Array(6);
    b = 0;
    J.vertices[b++] = -1;
    J.vertices[b++] = -1;
    J.vertices[b++] = 0;
    J.vertices[b++] = 0;
    J.vertices[b++] = 1;
    J.vertices[b++] = -1;
    J.vertices[b++] = 1;
    J.vertices[b++] = 0;
    J.vertices[b++] = 1;
    J.vertices[b++] = 1;
    J.vertices[b++] = 1;
    J.vertices[b++] = 1;
    J.vertices[b++] = -1;
    J.vertices[b++] = 1;
    J.vertices[b++] = 0;
    J.vertices[b++] = 1;
    b = 0;
    J.faces[b++] = 0;
    J.faces[b++] = 1;
    J.faces[b++] = 2;
    J.faces[b++] = 0;
    J.faces[b++] = 2;
    J.faces[b++] = 3;
    J.vertexBuffer = c.createBuffer();
    J.elementBuffer = c.createBuffer();
    J.tempTexture = c.createTexture();
    J.occlusionTexture = c.createTexture();
    c.bindBuffer(c.ARRAY_BUFFER, J.vertexBuffer);
    c.bufferData(c.ARRAY_BUFFER, J.vertices, c.STATIC_DRAW);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, J.elementBuffer);
    c.bufferData(c.ELEMENT_ARRAY_BUFFER, J.faces, c.STATIC_DRAW);
    c.bindTexture(c.TEXTURE_2D, J.tempTexture);
    c.texImage2D(c.TEXTURE_2D, 0, c.RGB, 16, 16, 0, c.RGB, c.UNSIGNED_BYTE, null);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.NEAREST);
    c.bindTexture(c.TEXTURE_2D, J.occlusionTexture);
    c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, 16, 16, 0, c.RGBA, c.UNSIGNED_BYTE, null);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.NEAREST);
    if (c.getParameter(c.MAX_VERTEX_TEXTURE_IMAGE_UNITS) <= 0) {
        J.hasVertexTexture = !1;
        J.program = c.createProgram();
        c.attachShader(J.program, ca('fragment', THREE.ShaderLib.lensFlare.fragmentShader));
        c.attachShader(J.program, ca('vertex', THREE.ShaderLib.lensFlare.vertexShader));
    } else {
        J.hasVertexTexture = !0;
        J.program = c.createProgram();
        c.attachShader(J.program, ca('fragment', THREE.ShaderLib.lensFlareVertexTexture.fragmentShader));
        c.attachShader(J.program, ca('vertex', THREE.ShaderLib.lensFlareVertexTexture.vertexShader));
    }
    c.linkProgram(J.program);
    J.attributes = {};
    J.uniforms = {};
    J.attributes.vertex = c.getAttribLocation(J.program, 'position');
    J.attributes.uv = c.getAttribLocation(J.program, 'UV');
    J.uniforms.renderType = c.getUniformLocation(J.program, 'renderType');
    J.uniforms.map = c.getUniformLocation(J.program, 'map');
    J.uniforms.occlusionMap = c.getUniformLocation(J.program, 'occlusionMap');
    J.uniforms.opacity = c.getUniformLocation(J.program, 'opacity');
    J.uniforms.scale = c.getUniformLocation(J.program, 'scale');
    J.uniforms.rotation = c.getUniformLocation(J.program, 'rotation');
    J.uniforms.screenPosition = c.getUniformLocation(J.program, 'screenPosition');
    var pb = !1;
    _sprite = {};
    _sprite.vertices = new Float32Array(16);
    _sprite.faces = new Uint16Array(6);
    b = 0;
    _sprite.vertices[b++] = -1;
    _sprite.vertices[b++] = -1;
    _sprite.vertices[b++] = 0;
    _sprite.vertices[b++] = 0;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] = -1;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] = 0;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] = -1;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] = 0;
    _sprite.vertices[b++] = 1;
    b = 0;
    _sprite.faces[b++] = 0;
    _sprite.faces[b++] = 1;
    _sprite.faces[b++] = 2;
    _sprite.faces[b++] = 0;
    _sprite.faces[b++] = 2;
    _sprite.faces[b++] = 3;
    _sprite.vertexBuffer = c.createBuffer();
    _sprite.elementBuffer = c.createBuffer();
    c.bindBuffer(c.ARRAY_BUFFER, _sprite.vertexBuffer);
    c.bufferData(c.ARRAY_BUFFER, _sprite.vertices, c.STATIC_DRAW);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer);
    c.bufferData(c.ELEMENT_ARRAY_BUFFER, _sprite.faces, c.STATIC_DRAW);
    _sprite.program = c.createProgram();
    c.attachShader(_sprite.program, ca('fragment', THREE.ShaderLib.sprite.fragmentShader));
    c.attachShader(_sprite.program, ca('vertex', THREE.ShaderLib.sprite.vertexShader));
    c.linkProgram(_sprite.program);
    _sprite.attributes = {};
    _sprite.uniforms = {};
    _sprite.attributes.position = c.getAttribLocation(_sprite.program, 'position');
    _sprite.attributes.uv = c.getAttribLocation(_sprite.program, 'uv');
    _sprite.uniforms.uvOffset = c.getUniformLocation(_sprite.program, 'uvOffset');
    _sprite.uniforms.uvScale = c.getUniformLocation(_sprite.program, 'uvScale');
    _sprite.uniforms.rotation = c.getUniformLocation(_sprite.program, 'rotation');
    _sprite.uniforms.scale = c.getUniformLocation(_sprite.program, 'scale');
    _sprite.uniforms.alignment = c.getUniformLocation(_sprite.program, 'alignment');
    _sprite.uniforms.map = c.getUniformLocation(_sprite.program, 'map');
    _sprite.uniforms.opacity = c.getUniformLocation(_sprite.program, 'opacity');
    _sprite.uniforms.useScreenCoordinates = c.getUniformLocation(_sprite.program, 'useScreenCoordinates');
    _sprite.uniforms.affectedByDistance = c.getUniformLocation(_sprite.program, 'affectedByDistance');
    _sprite.uniforms.screenPosition = c.getUniformLocation(_sprite.program, 'screenPosition');
    _sprite.uniforms.modelViewMatrix = c.getUniformLocation(_sprite.program, 'modelViewMatrix');
    _sprite.uniforms.projectionMatrix = c.getUniformLocation(_sprite.program, 'projectionMatrix');
    var ob = !1;
    this.setSize = function (f, s) {
        S.width = f;
        S.height = s;
        this.setViewport(0, 0, S.width, S.height);
    };
    this.setViewport = function (f, s, j, k) {
        wa = f;
        qa = s;
        ya = j;
        za = k;
        c.viewport(wa, qa, ya, za);
    };
    this.setScissor = function (f, s, j, k) {
        c.scissor(f, s, j, k);
    };
    this.enableScissorTest = function (f) {
        f ? c.enable(c.SCISSOR_TEST) : c.disable(c.SCISSOR_TEST);
    };
    this.enableDepthBufferWrite = function (f) {
        ta = f;
        c.depthMask(f);
    };
    this.setClearColorHex = function (f, s) {
        var j = new THREE.Color(f);
        c.clearColor(j.r, j.g, j.b, s);
    };
    this.setClearColor = function (f, s) {
        c.clearColor(f.r, f.g, f.b, s);
    };
    this.clear = function () {
        c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT | c.STENCIL_BUFFER_BIT);
    };
    this.setStencilShadowDarkness = function (f) {
        R.darkness = f;
    };
    this.initMaterial = function (f, s, j, k) {
        var m, w, x;
        if (f instanceof THREE.MeshDepthMaterial) x = 'depth';
        else if (f instanceof THREE.ShadowVolumeDynamicMaterial) x = 'shadowVolumeDynamic';
        else if (f instanceof THREE.MeshNormalMaterial) x = 'normal';
        else if (f instanceof THREE.MeshBasicMaterial) x = 'basic';
        else if (f instanceof THREE.MeshLambertMaterial) x = 'lambert';
        else if (f instanceof THREE.MeshPhongMaterial) x = 'phong';
        else if (f instanceof THREE.LineBasicMaterial) x = 'basic';
        else f instanceof THREE.ParticleBasicMaterial && (x = 'particle_basic');
        if (x) {
            var u = THREE.ShaderLib[x];
            f.uniforms = THREE.UniformsUtils.clone(u.uniforms);
            f.vertexShader = u.vertexShader;
            f.fragmentShader = u.fragmentShader;
        }
        var A, t, y;
        A = y = u = 0;
        for (t = s.length; A < t; A++) {
            w = s[A];
            w instanceof THREE.DirectionalLight && y++;
            w instanceof THREE.PointLight && u++;
        }
        if (u + y <= 4) s = y;
        else {
            s = Math.ceil((4 * y) / (u + y));
            u = 4 - s;
        }
        w = { directional: s, point: u };
        y = 50;
        if (k !== undefined && k instanceof THREE.SkinnedMesh) y = k.bones.length;
        var z;
        a: {
            A = f.fragmentShader;
            t = f.vertexShader;
            u = f.uniforms;
            s = f.attributes;
            j = {
                map: !!f.map,
                envMap: !!f.envMap,
                lightMap: !!f.lightMap,
                vertexColors: f.vertexColors,
                fog: j,
                sizeAttenuation: f.sizeAttenuation,
                skinning: f.skinning,
                morphTargets: f.morphTargets,
                maxMorphTargets: this.maxMorphTargets,
                maxDirLights: w.directional,
                maxPointLights: w.point,
                maxBones: y
            };
            var D;
            w = [];
            if (x) w.push(x);
            else {
                w.push(A);
                w.push(t);
            }
            for (D in j) {
                w.push(D);
                w.push(j[D]);
            }
            x = w.join();
            D = 0;
            for (w = pa.length; D < w; D++)
                if (pa[D].code == x) {
                    z = pa[D].program;
                    break a;
                }
            D = c.createProgram();
            prefix_fragment = ['#ifdef GL_ES\nprecision highp float;\n#endif', '#define MAX_DIR_LIGHTS ' + j.maxDirLights, '#define MAX_POINT_LIGHTS ' + j.maxPointLights, j.fog ? '#define USE_FOG' : '', j.fog instanceof THREE.FogExp2 ? '#define FOG_EXP2' : '', j.map ? '#define USE_MAP' : '', j.envMap ? '#define USE_ENVMAP' : '', j.lightMap ? '#define USE_LIGHTMAP' : '', j.vertexColors ? '#define USE_COLOR' : '', 'uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n'].join('\n');
            prefix_vertex = [
                c.getParameter(c.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0 ? '#define VERTEX_TEXTURES' : '',
                '#define MAX_DIR_LIGHTS ' + j.maxDirLights,
                '#define MAX_POINT_LIGHTS ' + j.maxPointLights,
                '#define MAX_BONES ' + j.maxBones,
                j.map ? '#define USE_MAP' : '',
                j.envMap ? '#define USE_ENVMAP' : '',
                j.lightMap ? '#define USE_LIGHTMAP' : '',
                j.vertexColors ? '#define USE_COLOR' : '',
                j.skinning ? '#define USE_SKINNING' : '',
                j.morphTargets ? '#define USE_MORPHTARGETS' : '',
                j.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',
                'uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n'
            ].join('\n');
            c.attachShader(D, ca('fragment', prefix_fragment + A));
            c.attachShader(D, ca('vertex', prefix_vertex + t));
            c.linkProgram(D);
            c.getProgramParameter(D, c.LINK_STATUS) || console.error('Could not initialise shader\nVALIDATE_STATUS: ' + c.getProgramParameter(D, c.VALIDATE_STATUS) + ', gl error [' + c.getError() + ']');
            D.uniforms = {};
            D.attributes = {};
            var B;
            A = ['viewMatrix', 'modelViewMatrix', 'projectionMatrix', 'normalMatrix', 'objectMatrix', 'cameraPosition', 'cameraInverseMatrix', 'boneGlobalMatrices', 'morphTargetInfluences'];
            for (B in u) A.push(B);
            B = A;
            u = 0;
            for (A = B.length; u < A; u++) {
                t = B[u];
                D.uniforms[t] = c.getUniformLocation(D, t);
            }
            A = ['position', 'normal', 'uv', 'uv2', 'tangent', 'color', 'skinVertexA', 'skinVertexB', 'skinIndex', 'skinWeight'];
            for (B = 0; B < j.maxMorphTargets; B++) A.push('morphTarget' + B);
            for (z in s) A.push(z);
            z = A;
            B = 0;
            for (s = z.length; B < s; B++) {
                j = z[B];
                D.attributes[j] = c.getAttribLocation(D, j);
            }
            pa.push({ program: D, code: x });
            z = D;
        }
        f.program = z;
        z = f.program.attributes;
        c.enableVertexAttribArray(z.position);
        z.color >= 0 && c.enableVertexAttribArray(z.color);
        z.normal >= 0 && c.enableVertexAttribArray(z.normal);
        z.tangent >= 0 && c.enableVertexAttribArray(z.tangent);
        if (f.skinning && z.skinVertexA >= 0 && z.skinVertexB >= 0 && z.skinIndex >= 0 && z.skinWeight >= 0) {
            c.enableVertexAttribArray(z.skinVertexA);
            c.enableVertexAttribArray(z.skinVertexB);
            c.enableVertexAttribArray(z.skinIndex);
            c.enableVertexAttribArray(z.skinWeight);
        }
        for (m in f.attributes) z[m] >= 0 && c.enableVertexAttribArray(z[m]);
        if (f.morphTargets) {
            f.numSupportedMorphTargets = 0;
            if (z.morphTarget0 >= 0) {
                c.enableVertexAttribArray(z.morphTarget0);
                f.numSupportedMorphTargets++;
            }
            if (z.morphTarget1 >= 0) {
                c.enableVertexAttribArray(z.morphTarget1);
                f.numSupportedMorphTargets++;
            }
            if (z.morphTarget2 >= 0) {
                c.enableVertexAttribArray(z.morphTarget2);
                f.numSupportedMorphTargets++;
            }
            if (z.morphTarget3 >= 0) {
                c.enableVertexAttribArray(z.morphTarget3);
                f.numSupportedMorphTargets++;
            }
            if (z.morphTarget4 >= 0) {
                c.enableVertexAttribArray(z.morphTarget4);
                f.numSupportedMorphTargets++;
            }
            if (z.morphTarget5 >= 0) {
                c.enableVertexAttribArray(z.morphTarget5);
                f.numSupportedMorphTargets++;
            }
            if (z.morphTarget6 >= 0) {
                c.enableVertexAttribArray(z.morphTarget6);
                f.numSupportedMorphTargets++;
            }
            if (z.morphTarget7 >= 0) {
                c.enableVertexAttribArray(z.morphTarget7);
                f.numSupportedMorphTargets++;
            }
            k.__webglMorphTargetInfluences = new Float32Array(this.maxMorphTargets);
            f = 0;
            for (m = this.maxMorphTargets; f < m; f++) k.__webglMorphTargetInfluences[f] = 0;
        }
    };
    this.render = function (f, s, j, k) {
        var m,
            w,
            x,
            u,
            A,
            t,
            y,
            z,
            D = f.lights,
            B = f.fog;
        s.matrixAutoUpdate && s.updateMatrix();
        f.update(undefined, !1, s);
        s.matrixWorldInverse.flattenToArray(Xa);
        s.projectionMatrix.flattenToArray(Ta);
        Pa.multiply(s.projectionMatrix, s.matrixWorldInverse);
        p(Pa);
        this.initWebGLObjects(f);
        Ia(j);
        (this.autoClear || k) && this.clear();
        A = f.__webglObjects.length;
        for (k = 0; k < A; k++) {
            m = f.__webglObjects[k];
            y = m.object;
            if (y.visible)
                if (!(y instanceof THREE.Mesh) || q(y)) {
                    y.matrixWorld.flattenToArray(y._objectMatrixArray);
                    V(y, s);
                    F(m);
                    m.render = !0;
                    if (this.sortObjects) {
                        Ua.copy(y.position);
                        Pa.multiplyVector3(Ua);
                        m.z = Ua.z;
                    }
                } else m.render = !1;
            else m.render = !1;
        }
        this.sortObjects && f.__webglObjects.sort(H);
        t = f.__webglObjectsImmediate.length;
        for (k = 0; k < t; k++) {
            m = f.__webglObjectsImmediate[k];
            y = m.object;
            if (y.visible) {
                y.matrixAutoUpdate && y.matrixWorld.flattenToArray(y._objectMatrixArray);
                V(y, s);
                E(m);
            }
        }
        oa(THREE.NormalBlending);
        for (k = 0; k < A; k++) {
            m = f.__webglObjects[k];
            if (m.render) {
                y = m.object;
                z = m.buffer;
                x = m.opaque;
                o(y);
                for (m = 0; m < x.count; m++) {
                    u = x.list[m];
                    n(u.depthTest);
                    g(s, D, B, u, z, y);
                }
            }
        }
        for (k = 0; k < t; k++) {
            m = f.__webglObjectsImmediate[k];
            y = m.object;
            if (y.visible) {
                x = m.opaque;
                o(y);
                for (m = 0; m < x.count; m++) {
                    u = x.list[m];
                    n(u.depthTest);
                    w = e(s, D, B, u, y);
                    y.render(function (O) {
                        h(O, w, u.shading);
                    });
                }
            }
        }
        for (k = 0; k < A; k++) {
            m = f.__webglObjects[k];
            if (m.render) {
                y = m.object;
                z = m.buffer;
                x = m.transparent;
                o(y);
                for (m = 0; m < x.count; m++) {
                    u = x.list[m];
                    oa(u.blending);
                    n(u.depthTest);
                    g(s, D, B, u, z, y);
                }
            }
        }
        for (k = 0; k < t; k++) {
            m = f.__webglObjectsImmediate[k];
            y = m.object;
            if (y.visible) {
                x = m.transparent;
                o(y);
                for (m = 0; m < x.count; m++) {
                    u = x.list[m];
                    oa(u.blending);
                    n(u.depthTest);
                    w = e(s, D, B, u, y);
                    y.render(function (O) {
                        h(O, w, u.shading);
                    });
                }
            }
        }
        f.__webglSprites.length && M(f, s);
        stencil && f.__webglShadowVolumes.length && f.lights.length && I(f);
        f.__webglLensFlares.length && N(f, s);
        if (j && j.minFilter !== THREE.NearestFilter && j.minFilter !== THREE.LinearFilter) {
            c.bindTexture(c.TEXTURE_2D, j.__webglTexture);
            c.generateMipmap(c.TEXTURE_2D);
            c.bindTexture(c.TEXTURE_2D, null);
        }
    };
    this.initWebGLObjects = function (f) {
        if (!f.__webglObjects) {
            f.__webglObjects = [];
            f.__webglObjectsImmediate = [];
            f.__webglShadowVolumes = [];
            f.__webglLensFlares = [];
            f.__webglSprites = [];
        }
        for (; f.__objectsAdded.length; ) {
            var s = f.__objectsAdded[0],
                j = f,
                k = void 0,
                m = void 0,
                w = void 0;
            if (s._modelViewMatrix == undefined) {
                s._modelViewMatrix = new THREE.Matrix4();
                s._normalMatrixArray = new Float32Array(9);
                s._modelViewMatrixArray = new Float32Array(16);
                s._objectMatrixArray = new Float32Array(16);
                s.matrixWorld.flattenToArray(s._objectMatrixArray);
            }
            if (s instanceof THREE.Mesh) {
                m = s.geometry;
                m.geometryGroups == undefined && sa(m);
                for (k in m.geometryGroups) {
                    w = m.geometryGroups[k];
                    if (!w.__webglVertexBuffer) {
                        var x = w;
                        x.__webglVertexBuffer = c.createBuffer();
                        x.__webglNormalBuffer = c.createBuffer();
                        x.__webglTangentBuffer = c.createBuffer();
                        x.__webglColorBuffer = c.createBuffer();
                        x.__webglUVBuffer = c.createBuffer();
                        x.__webglUV2Buffer = c.createBuffer();
                        x.__webglSkinVertexABuffer = c.createBuffer();
                        x.__webglSkinVertexBBuffer = c.createBuffer();
                        x.__webglSkinIndicesBuffer = c.createBuffer();
                        x.__webglSkinWeightsBuffer = c.createBuffer();
                        x.__webglFaceBuffer = c.createBuffer();
                        x.__webglLineBuffer = c.createBuffer();
                        if (x.numMorphTargets) {
                            var u = void 0,
                                A = void 0;
                            x.__webglMorphTargetsBuffers = [];
                            u = 0;
                            for (A = x.numMorphTargets; u < A; u++) x.__webglMorphTargetsBuffers.push(c.createBuffer());
                        }
                        x = w;
                        u = s;
                        var t = void 0,
                            y = void 0,
                            z = void 0;
                        z = void 0;
                        var D = void 0,
                            B = void 0,
                            O = void 0,
                            W = (O = A = 0);
                        y = void 0;
                        z = void 0;
                        var P = void 0;
                        t = void 0;
                        y = void 0;
                        D = u.geometry;
                        P = D.faces;
                        B = x.faces;
                        t = 0;
                        for (y = B.length; t < y; t++) {
                            z = B[t];
                            z = P[z];
                            if (z instanceof THREE.Face3) {
                                A += 3;
                                O += 1;
                                W += 3;
                            } else if (z instanceof THREE.Face4) {
                                A += 4;
                                O += 2;
                                W += 4;
                            }
                        }
                        t = x;
                        y = u;
                        P = void 0;
                        B = void 0;
                        var X = void 0,
                            Ga = void 0;
                        X = void 0;
                        z = [];
                        P = 0;
                        for (B = y.materials.length; P < B; P++) {
                            X = y.materials[P];
                            if (X instanceof THREE.MeshFaceMaterial) {
                                X = 0;
                                for (l = t.materials.length; X < l; X++) (Ga = t.materials[X]) && z.push(Ga);
                            } else (Ga = X) && z.push(Ga);
                        }
                        t = z;
                        a: {
                            y = void 0;
                            P = void 0;
                            B = t.length;
                            for (y = 0; y < B; y++) {
                                P = t[y];
                                if (P.map || P.lightMap || P instanceof THREE.MeshShaderMaterial) {
                                    y = !0;
                                    break a;
                                }
                            }
                            y = !1;
                        }
                        a: {
                            P = void 0;
                            B = void 0;
                            z = t.length;
                            for (P = 0; P < z; P++) {
                                B = t[P];
                                if (!((B instanceof THREE.MeshBasicMaterial && !B.envMap) || B instanceof THREE.MeshDepthMaterial)) {
                                    P = B && B.shading != undefined && B.shading == THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading;
                                    break a;
                                }
                            }
                            P = !1;
                        }
                        a: {
                            B = void 0;
                            z = void 0;
                            X = t.length;
                            for (B = 0; B < X; B++) {
                                z = t[B];
                                if (z.vertexColors) {
                                    z = z.vertexColors;
                                    break a;
                                }
                            }
                            z = !1;
                        }
                        x.__vertexArray = new Float32Array(A * 3);
                        if (P) x.__normalArray = new Float32Array(A * 3);
                        if (D.hasTangents) x.__tangentArray = new Float32Array(A * 4);
                        if (z) x.__colorArray = new Float32Array(A * 3);
                        if (y) {
                            if (D.faceUvs.length > 0 || D.faceVertexUvs.length > 0) x.__uvArray = new Float32Array(A * 2);
                            if (D.faceUvs.length > 1 || D.faceVertexUvs.length > 1) x.__uv2Array = new Float32Array(A * 2);
                        }
                        if (u.geometry.skinWeights.length && u.geometry.skinIndices.length) {
                            x.__skinVertexAArray = new Float32Array(A * 4);
                            x.__skinVertexBArray = new Float32Array(A * 4);
                            x.__skinIndexArray = new Float32Array(A * 4);
                            x.__skinWeightArray = new Float32Array(A * 4);
                        }
                        x.__faceArray = new Uint16Array(O * 3 + (u.geometry.edgeFaces ? u.geometry.edgeFaces.length * 6 : 0));
                        x.__lineArray = new Uint16Array(W * 2);
                        if (x.numMorphTargets) {
                            x.__morphTargetsArrays = [];
                            D = 0;
                            for (B = x.numMorphTargets; D < B; D++) x.__morphTargetsArrays.push(new Float32Array(A * 3));
                        }
                        x.__needsSmoothNormals = P == THREE.SmoothShading;
                        x.__uvType = y;
                        x.__vertexColorType = z;
                        x.__normalType = P;
                        x.__webglFaceCount = O * 3 + (u.geometry.edgeFaces ? u.geometry.edgeFaces.length * 6 : 0);
                        x.__webglLineCount = W * 2;
                        D = 0;
                        for (B = t.length; D < B; D++)
                            if (t[D].attributes) {
                                x.__webglCustomAttributes = {};
                                for (a in t[D].attributes) {
                                    y = t[D].attributes[a];
                                    O = 1;
                                    if (y.type === 'v2') O = 2;
                                    else if (y.type === 'v3') O = 3;
                                    else if (y.type === 'v4') O = 4;
                                    else y.type === 'c' && (O = 3);
                                    y.size = O;
                                    y.needsUpdate = !0;
                                    y.array = new Float32Array(A * O);
                                    y.buffer = c.createBuffer();
                                    x.__webglCustomAttributes[a] = y;
                                }
                            }
                        m.__dirtyVertices = !0;
                        m.__dirtyMorphTargets = !0;
                        m.__dirtyElements = !0;
                        m.__dirtyUvs = !0;
                        m.__dirtyNormals = !0;
                        m.__dirtyTangents = !0;
                        m.__dirtyColors = !0;
                    }
                    s instanceof THREE.ShadowVolume ? da(j.__webglShadowVolumes, w, s) : da(j.__webglObjects, w, s);
                }
            } else if (s instanceof THREE.LensFlare) da(j.__webglLensFlares, undefined, s);
            else if (s instanceof THREE.Ribbon) {
                m = s.geometry;
                if (!m.__webglVertexBuffer) {
                    k = m;
                    k.__webglVertexBuffer = c.createBuffer();
                    k.__webglColorBuffer = c.createBuffer();
                    k = m;
                    w = k.vertices.length;
                    k.__vertexArray = new Float32Array(w * 3);
                    k.__colorArray = new Float32Array(w * 3);
                    k.__webglVertexCount = w;
                    m.__dirtyVertices = !0;
                    m.__dirtyColors = !0;
                }
                da(j.__webglObjects, m, s);
            } else if (s instanceof THREE.Line) {
                m = s.geometry;
                if (!m.__webglVertexBuffer) {
                    k = m;
                    k.__webglVertexBuffer = c.createBuffer();
                    k.__webglColorBuffer = c.createBuffer();
                    k = m;
                    w = k.vertices.length;
                    k.__vertexArray = new Float32Array(w * 3);
                    k.__colorArray = new Float32Array(w * 3);
                    k.__webglLineCount = w;
                    m.__dirtyVertices = !0;
                    m.__dirtyColors = !0;
                }
                da(j.__webglObjects, m, s);
            } else if (s instanceof THREE.ParticleSystem) {
                m = s.geometry;
                if (!m.__webglVertexBuffer) {
                    k = m;
                    k.__webglVertexBuffer = c.createBuffer();
                    k.__webglColorBuffer = c.createBuffer();
                    k = m;
                    w = k.vertices.length;
                    k.__vertexArray = new Float32Array(w * 3);
                    k.__colorArray = new Float32Array(w * 3);
                    k.__sortArray = [];
                    k.__webglParticleCount = w;
                    m.__dirtyVertices = !0;
                    m.__dirtyColors = !0;
                }
                da(j.__webglObjects, m, s);
            } else if (THREE.MarchingCubes !== undefined && s instanceof THREE.MarchingCubes) j.__webglObjectsImmediate.push({ object: s, opaque: { list: [], count: 0 }, transparent: { list: [], count: 0 } });
            else s instanceof THREE.Sprite && j.__webglSprites.push(s);
            f.__objectsAdded.splice(0, 1);
        }
        for (; f.__objectsRemoved.length; ) {
            s = f.__objectsRemoved[0];
            j = f;
            m = void 0;
            k = void 0;
            for (m = j.__webglObjects.length - 1; m >= 0; m--) {
                k = j.__webglObjects[m].object;
                if (s == k) {
                    j.__webglObjects.splice(m, 1);
                    break;
                }
            }
            f.__objectsRemoved.splice(0, 1);
        }
        s = 0;
        for (j = f.__webglObjects.length; s < j; s++) L(f.__webglObjects[s].object, f);
        s = 0;
        for (j = f.__webglShadowVolumes.length; s < j; s++) L(f.__webglShadowVolumes[s].object, f);
        s = 0;
        for (j = f.__webglLensFlares.length; s < j; s++) L(f.__webglLensFlares[s].object, f);
    };
    this.setFaceCulling = function (f, s) {
        if (f) {
            !s || s == 'ccw' ? c.frontFace(c.CCW) : c.frontFace(c.CW);
            if (f == 'back') c.cullFace(c.BACK);
            else f == 'front' ? c.cullFace(c.FRONT) : c.cullFace(c.FRONT_AND_BACK);
            c.enable(c.CULL_FACE);
        } else c.disable(c.CULL_FACE);
    };
    this.supportsVertexTextures = function () {
        return c.getParameter(c.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0;
    };
};
THREE.WebGLRenderTarget = function (b, d, e) {
    this.width = b;
    this.height = d;
    e = e || {};
    this.wrapS = e.wrapS !== undefined ? e.wrapS : THREE.ClampToEdgeWrapping;
    this.wrapT = e.wrapT !== undefined ? e.wrapT : THREE.ClampToEdgeWrapping;
    this.magFilter = e.magFilter !== undefined ? e.magFilter : THREE.LinearFilter;
    this.minFilter = e.minFilter !== undefined ? e.minFilter : THREE.LinearMipMapLinearFilter;
    this.format = e.format !== undefined ? e.format : THREE.RGBAFormat;
    this.type = e.type !== undefined ? e.type : THREE.UnsignedByteType;
    this.depthBuffer = e.depthBuffer !== undefined ? e.depthBuffer : !0;
    this.stencilBuffer = e.stencilBuffer !== undefined ? e.stencilBuffer : !0;
};
