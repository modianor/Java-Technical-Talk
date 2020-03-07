## Java Native关键字和方法区

#### Native关键字介绍

native关键字是用来修饰方法的，被修饰的方法称为本地方法，当该方法被jvm调用时，首先会进入Native Method Area，然后通过JVM的JNI（Java native interface）接口调用当前操作系统的提供的本地类库。调用流程图如下

![img](Java Native关键字和方法区.assets/690102-20160725102547356-2054241629.png)



#### 方法区(Method Area)

1. 什么是方法区 （Method Area）

   《深入理解JVM》书中对方法区（Method Area）描述如下

   > 方法区（Method Area）与Java堆一样，是各个线程专项的内存区域。

2. 方法区（Method Area）存储什么

   《深入理解JVM》书中对方法区（Method Area）存储内容描述如下：

   > 它存储已被Java虚拟机加载过的类信息、常量、静态变量、即使编译器编译后的代码等

   1. 方法区存储的类信息

      对每个加载的类型（类Class、接口interface、枚举enum、注解annotation），JVM必须在方法区中存储以下类型信息：

      - 这个类型的完整有效名称（全名=包名+类名）
      - 这个类型直接弗雷德完整有效名称（java.lang.Object以为，其他类型若没有申明父类，默认父类是Object）
      - 这个类型的修饰符（public、abstract、final的某个子集）
      - 这个类型直接接口的一个有序列表，除此以为还有方法区（Method Area）存储类信息
      - 类型的常量池（constant pool）
      - 域（Field）信息
      - 方法（Method）信息
      - 除了常量外的所有静态（static）变量

   2. 方法区存储的常量

   3. 方法区存储的静态变量

   4. 方法区存储的方法



