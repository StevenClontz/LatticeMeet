<script lang="ts">
    import md5 from 'md5';
  
    export let size : number = 50;
    export let rating : string = 'g';
    export let email : string | null = "";
  
    $: formattedEmail = (email || '').trim().toLowerCase()
    $: def = 'identicon';
    $: base = `//en.gravatar.com/avatar/`;
    $: queryString = getQuery(size, rating, def, 1);
    $: hash = md5(formattedEmail, {encoding: 'binary'});
    $: src = `${base}${hash}?${queryString}`;
    $: formattedSize = typeof size === 'number' ? `${size}px` : size;
  
    function getQuery(s:number, r:string, d:string, m:number) {
      return `s=${s*m}&r=${r}&d=${d}`;
    }
</script>
  
<img
    alt="{`Gravatar for ${formattedEmail}`}"
    {src}
    width={formattedSize}
    height={formattedSize}
/>