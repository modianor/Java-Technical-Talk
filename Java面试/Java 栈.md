#### 栈（Stack）



1. ##### 什么是栈？

   栈是一种数据结构，数据元素先进后出（FILO）

   一般将元素压入栈顶，称之为压栈。将元素从栈顶取出，称之为弹栈。

2. ##### 什么是JVM Stack（虚拟机栈、本地方法栈、线程栈、栈）

   1. ##### JVM Stack 存在的作用？

      jvm stack 是一种数据容器，那么他的作用就是在jvm调用方法的时候记录方法调用期间所有用到的数据并且记录调用顺序。jvm stack FILO的操作顺序也对应了jvm调用方法的顺序。

      **它是线程私有的**，与线程一同被创建，**用于存储栈帧 Stack Frame**

   2. ##### JVM Stack中存放的是什么元素？

      jvm stack中存储的是栈帧

      1. ###### 什么是栈帧？

         一个栈帧需要分配多少内存，不会受到程序运行期变量数据的影响，而仅仅取决于具体的虚拟机实现。

         栈帧是一种数据结构，里面存储了方法运行期间所需要的数据，比如说

         - 局部变量表

           1. 在编译程序代码的时候就可以确定栈帧中需要多大的局部变量表，具体大小可在编译后的 Class 文件中看到。
           2. 局部变量表的容量以 Variable Slot（变量槽）为最小单位，每个变量槽都可以存储 32 位长度的内存空间。
           3. 在方法执行时，虚拟机使用局部变量表完成参数值到参数变量列表的传递过程的，如果执行的是实例方法，那局部变量表中第 0 位索引的 Slot 默认是用于传递方法所属对象实例的引用（在方法中可以通过关键字 this 来访问到这个隐含的参数）。
           4. 其余参数则按照参数表顺序排列，占用从 1 开始的局部变量 Slot。
           5. 基本类型数据以及引用和 returnAddress（返回地址）占用一个变量槽，long 和 double 需要两个。

         - 操作数栈

           1. 同样也可以在编译期确定大小。
           2. Frame 被创建时，操作栈是空的。操作栈的每个项可以存放 JVM 的各种类型数据，其中 long 和 double 类型（64位数据）占用两个栈深。
           3. 方法执行的过程中，会有各种字节码指令往操作数栈中写入和提取内容，也就是出栈和入栈操作（与 Java 栈中栈帧操作类似）。
           4. 操作栈调用其它有返回结果的方法时，会把结果 push 到栈上（通过操作数栈来进行参数传递）。

         - 动态链接

           1. 每个栈帧都包含一个指向运行时常量池中该栈帧所属方法的引用，持有这个引用是为了支持方法调用过程中的动态链接。

           2. 在[类加载阶段](https://www.cnblogs.com/jhxxb/p/10900405.html)中的解析阶段会将符号引用转为直接引用，这种转化也称为静态解析。另外的一部分将在运行时转化为直接引用，这部分称为动态链接。

              - ### 1.1.有且仅有 5 种情况必须立即对类进行“初始化”：

                ```
                1.在遇到 new、putstatic、getstatic、invokestatic 字节码指令时，如果类尚未初始化，则需要先触发初始化。
                2.对类进行反射调用时，如果类还没有初始化，则需要先触发初始化。
                3.初始化一个类时，如果其父类还没有初始化，则需要先初始化父类。
                4.虚拟机启动时，用于需要指定一个包含 main() 方法的主类，虚拟机会先初始化这个主类。
                5.当使用 JDK 1.7 的动态语言支持时，如果一个 java.lang.invoke.MethodHandle 实例最后的解析结果为 REF_getStatic、REF_putStatic、REF_invokeStatic 的方法句柄，并且这个方法句柄所对应的类还没初始化，则需要先触发初始化。
                
                这 5 种场景中的行为称为对一个类进行主动引用，除此之外，其它所有引用类的方式都不会触发初始化，称为被动引用。
                ```

         - 返回地址

           1. 方法开始执行后，只有 2 种方式可以退出 ：方法返回指令，异常退出。

         - 帧数据区

           1. 帧数据区的大小依赖于 JVM 的具体实现。

   

#### 类的加载过程（超级具体）

##### 加载

JVM 需要完成 3 件事：

```
1.通过类的全限定名获取该类的二进制字节流。
2.将二进制字节流所代表的静态结构转化为方法区的运行时数据结构。
3.在内存中创建一个代表该类的 java.lang.Class 对象，作为方法区这个类的各种数据的访问入口。
```

怎样获取类的二进制字节流，JVM 没有限制。除了从编译好的 .class 文件中读取，还有以下几种方式：

```
从 zip 包中读取，如 jar、war 等
从网络中获取
通过动态代理生成代理类的二进制字节流
从数据库中读取
。。。
```

数组类本身不通过类加载器创建，由 JVM 直接创建，再由类加载器创建数组中的元素类。

加载阶段与连接阶段的部分内容交叉进行，但这两个阶段的开始仍然保持先后顺序。

 

##### 验证

确保 Class 文件的字节流中包含的信息符合当前虚拟机的要求，并且不会危害虚拟机自身的安全。

 

##### 准备

为类变量（静态成员变量）分配内存并设置初始值的阶段。这些变量（不包括实例变量）所使用的内存都在方法区中进行分配。

基本类型初始值（JDK8）https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.12.5

[![复制代码](Java 栈.assets/copycode.gif)](javascript:void(0);)

```
对于 byte 类型，默认值为零，即（byte）0。
对于 short 类型，默认值为零，即（short）0。
对于 int 类型，默认值为零，即 0。
对于 long 类型，默认值为零，即 0L。
对于 float 类型，默认值为正零，即 0.0f。
对于 double 类型，默认值为正零，即 0.0d。
对于 char 类型，默认值为空字符，即 '\u0000'。
对于 boolean 类型，默认值为 false。
对于所有引用类型，默认值为 null。
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

存在特殊情况 https://www.jianshu.com/p/520295a63967

```java
/**
 * 准备阶段过后的初始值为 0 而不是 123，这时候尚未开始执行任何 Java 方法
 */
public static int value = 123;

/**
 * 同时使用 final 、static 来修饰的变量（常量），并且这个变量的数据类型是基本类型或者 String 类型，就生成 ConstantValue 属性来进行初始化。
 * 没有 final 修饰或者并非基本类型及 String 类型，则选择在 <clinit> 方法中进行初始化。
 * 准备阶段虚拟机会根据 ConstantValue 的设置将 value 赋值为 123
 */
public static final int value = 123;
```

##### 解析

虚拟机将常量池内的符号引用替换为直接引用。会把该类所引用的其他类全部加载进来（ 引用方式：继承、实现接口、域变量、方法定义、方法中定义的本地变量）

https://www.cnblogs.com/shinubi/articles/6116993.html

符号引用：一个 java 文件会编译成一个class文件。在编译时，java 类并不知道所引用的类的实际地址，因此只能使用符号引用来代替。

直接引用：直接指向目标的指针（指向方法区，Class 对象）、指向相对偏移量（指向堆区，Class 实例对象）或指向能间接定位到目标的句柄。

 

##### 初始化

类加载过程的最后一步，是执行类构造器 <clinit>() 方法的过程。

<init>() 与 <clinit>() 介绍： https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.9

https://blog.csdn.net/u013309870/article/details/72975536

<init>()：为 Class 类实例构造器，对非静态变量解析初始化，一个类构造器对应个。

<clinit>()：为 Class 类构造器对静态变量，静态代码块进行初始化，通常一个类对应一个，不带参数，且是 void 返回。当一个类没有静态语句块，也没有对类变量的赋值操作，那么编译器可以不为这个类生成 <clinit>() 方法

**加载顺序：**

<clinit>() 方法是由编译器自动收集类中的所有**类变量的赋值动作\**语句\****和**静态块（static {}）中的语句**合并产生的，编译器收集的顺序由语句在源文件中出现的顺序所决定。

静态语句块中只能访问定义在静态语句块之前的变量，定义在它之后的变量，在前面的静态语句块中可以赋值，但不能访问。

```Java
static {
    i = 0;  // 给后面的变量赋值，可以正常编译通过
    System.out.println(i);  // 使用后面的变量，编译器会提示“非法向前引用”
}
static int i = 1;
```

虚拟机会保证在子类的 <clinit>() 方法执行之前，父类的 <clinit>() 方法已经执行完毕。

由于父类的 <clinit>() 方法先执行，意味着父类中定义的静态语句块要优先于子类的变量赋值操作。

![img](Java 栈.assets/ExpandedBlockStart.gif)

[![复制代码](Java 栈.assets/copycode-1583592941032.gif)](javascript:void(0);)

```Java
static class Parent {
    static {
        A = 2;
    }
    public static int A = 1;
}

static class Sub extends Parent {
    public static int B = A;
}

public static void main(String[] args) {
    System.out.println(Sub.B);  // 输出 1
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

来看一个类属性加载顺序的问题

![img](Java 栈.assets/ExpandedBlockStart.gif)

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```Java
public class JvmTest {

    public static JvmTest jt = new JvmTest();

    public static int a;
    public static int b = 0;

    static {
        a++;
        b++;
    }

    public JvmTest() {
        a++;
        b++;
    }

    public static void main(String[] args) {
        /**
         * 准备阶段：为 jt、a、b 分配内存并赋初始值 jt=null、a=0、b=0
         * 解析阶段：将 jt 指向内存中的地址
         * 初始化：jt 代码位置在最前面，这时候 a=1、b=1
         *          a 没有默认值，不执行，a还是1，b 有默认值，b赋值为0
         *          静态块过后，a=2、b=1
         */
        System.out.println(a);  // 输出 2
        System.out.println(b);  // 输出 1
    }
}
```

[![复制代码](Java 栈.assets/copycode-1583592941032.gif)](javascript:void(0);)

**关于接口初始化：**

接口中不能使用静态代码块，但接口也需要通过 <clinit>() 方法为接口中定义的静态成员变量显式初始化。

接口与类不同，接口的 <clinit>() 方法不需要先执行父类的 <clinit>() 方法，只有当父接口中定义的变量被使用时，父接口才会初始化。

 

虚拟机会保证一个类的 <clinit>() 方法在多线程环境中被正确加锁、同步。如果多个线程同时去初始化一个类，那么只会有一个线程去执行这个类的 <clinit>() 方法。