
/**test**/
function test_meta_codec() {
    {

        const v: protos.IPeopleBodyContent = {
            ood_list: [to_buf(device_id).unwrap().to_buf],
            name: '纳斯赛博伯',
            ood_work_mode: "standalone",
        };
        const buf = protos.PeopleBodyContent.encode(v).finish();
        console.info(buf.byteLength);
        console.info(buf);
    }

    {
        const bs = new Buckytest(63);
        const buf = to_buf(bs).unwrap();
        assert(buf.byteLength === 1);
        const decoder = new BuckySizeDecoder();
        const [ret, len] = decoder.raw_decode(buf).unwrap();
        assert(ret === 63);
    }
    {
        const bs = new BuckySize(64);
        const buf = to_buf(bs).unwrap();
        assert(buf.byteLength === 1);
        const decoder = new BuckySizeDecoder();
        const [ret, len] = decoder.raw_decode(buf).unwrap();
        assert(ret === 64);
    }

    const buf = "0002500e0000000000010030818902818100e0252144cac6aa8493f252c1c7d288afd9d01f04430a24f19bbd1f0fec428278b149f3b748e26a532c7e238dcdde6fb60d3820727f53b7ae090ce1bb04f637d43aea4551043a06535ded73e6a7de845e6a6187cfcd4def56b841fd098afc0671f659bfbabd1fbceb268b6fa0f47b8c7e3cb698a2d6ba120e54b6df9064c889ed0203010001000000000000000000000000000000000000000000000000000000002f3b2f6e3acd9000013f0a2045c40d30000cd65e863aa69f59d818f2090e3fa3b3d646dadc87568f773da50c120fe7bab3e696afe8b59be58d9ae4bcaf220a7374616e64616c6f6e650100ff002f3b2f6e3ad56000c661eeddb115b2b1cc8f6a0abe871b83c3108379c766303457676e1beca4836220767e72cac8fa53b3addff7686a604ee5537b4593d7ef363dcfd827dace32a51fb46c527330d6cb1a2bf37a4fcc4d6bae9ed5acf0289c7f6fa3e957c4a11362bf237746a253edd574c59acf85705d36747dd83ac65acd0995c201e76be7db5f0100ff002f3b2f6e3e09b000bb6a8d783a3be84580323e7e70b7aeb0c277c60c09705218fe77eb5a527df5cfdfe738d05c0661c9e06f59c883d7b314d4709d56675cecdde81bbb72dc692c5413c9a39f81aaf7fd928319f7bd4183132ab3c383b6e39a924a87ba1608133cbd2a6bdfeb2e613752971d24c944ed666ed5d50c9a77177ab4077143c5354f90c2";
    const decoder = new PeopleDecoder();
    const ret = decoder.from_hex(buf);
    assert(!ret.err);

    const people = ret.unwrap();
    console.info(people.name());
    // people.set_name("buckyball");
    const sd = people.to_hex().unwrap();
    console.info(sd);
   
    const data = SavedMetaObject.try_from(people).unwrap();
    const hash = data.hash().unwrap();
    console.info(hash.as_slice().toHex());
}
