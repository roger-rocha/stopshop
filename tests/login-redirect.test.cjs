const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const context={exports:{}};
// redirect throws in Next.js; use a sentinel to observe its destination.
context.require=name=>({'next/navigation':{redirect:p=>{throw {destination:p}}},'@/lib/auth':{login:async()=>({ok:true})},'@/lib/validators':{loginSchema:{safeParse:()=>({success:true,data:{email:'test@example.com',password:'test'}})}}}[name]);
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/server/actions/auth.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
test('login redirects only to local admin paths',async()=>{
 for(const [value,expected]of [['https://evil.example','/admin'],['//evil.example','/admin'],['/admin\\evil','/admin'],['/admin/\n//evil','/admin'],['/administrator','/admin'],['/admin/stores?id=1','/admin/stores?id=1'],['/admin','/admin']]){
  await assert.rejects(context.exports.loginAction({}, {get:k=>k==='next'?value:''}),e=>e.destination===expected);
 }
});
