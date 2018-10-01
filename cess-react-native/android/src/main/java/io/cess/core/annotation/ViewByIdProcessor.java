package io.cess.core.annotation;

import android.view.View;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;

/**
 * 
 * @author lin
 * @date Jun 14, 2015 5:22:09 PM
 *
 */
public class ViewByIdProcessor implements FieldProcessor{

	@Override
	public void process(Object target, View view, Field field, Annotation annotation,
						Package pack) {

		ViewById item = (ViewById)annotation;
		field.setAccessible(true);

		int viewId = 0;
		if(item.value() != 0){
			viewId = item.value();
		}
		else if(!"".equals(item.id())){
			viewId = Utils.getId(pack,item.id());
		}else{
			viewId = Utils.getId(pack,field.getName());
		}

		View fview = null;
		if(viewId > 0){
			fview = view.findViewById(viewId);
		}else{
			return;
		}

		try{
			field.set(target, fview);
		}catch(Throwable e){
		}

	}

}
