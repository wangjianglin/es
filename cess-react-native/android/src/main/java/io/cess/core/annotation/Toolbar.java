package io.cess.core.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 表示对应的 Activity 是否有 ToolBar
 * @author lin
 * @date 2018/8/29 23:12
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Toolbar {
    /**
     * true 表示有 ToolBar，false 表示没有 ToolBar
     * @return
     */
    boolean value();
}
