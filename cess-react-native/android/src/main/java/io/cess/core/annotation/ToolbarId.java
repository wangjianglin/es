package io.cess.core.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 指定 tools id，根据 tools is 加载 ToolsBar 对象
 * @author lin
 * @date 09/06/2017.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ToolbarId {
    int value() default 0;
    String id() default "";
}
