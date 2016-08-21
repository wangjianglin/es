import {isObject,test,http,httpCommUrl} from 'lin-core';

describe('加法函数的测试', function() {

    it('test',function(done){
        this.timeout(25000);
        // var xhr = new XMLHttpRequest();
        // test().then(() => console.log('done'));

        // console.log(isObject);
        // console.log(http);
        // http();
        //http.commUrl('http://s.feicuibaba.com');
        http.commUrl('/api');
        http.addHeader('__http_comm_protocol__','');
        http.addHeader('__http_comm_protocol_debug__','');
        http({
            url:'/core/comm/test.action',
            // method:'get',
            params:{
                data:'测试中文！'
            }
        }).then((data)=>{
            console.log(data);
            done();
        },(error)=>{
            console.log(error);
            done();
        })

        //return test()//.then(() => console.log('done'));
    });

  it('1 加 1 应该等于 2', function() {
    expect(2).to.be.equal(2);
  });
});