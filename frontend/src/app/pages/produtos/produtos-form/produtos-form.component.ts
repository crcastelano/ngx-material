import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutosGQL } from '../produtos.GQL';
import Swal from 'sweetalert2';
import { fkUnidadeMedida, datasource } from '../produtos-datasource';

@Component({
  selector: "app-produtos-form",
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.scss'],
  // host: { class: 'example-height-60 example-horizontal-spread' },
})
export class ProdutosFormComponent implements OnInit {
  idForm: number;
  resp: any = {};
  operacao = 'Novo Produto';
  form: FormGroup;
  isLoadingResults = false;
  inputShape = 'semi-round';
  value: Date;
  public fkUnidadeMedida: any[] = [];
  public options: any;

  constructor(
    private produtosGQL: ProdutosGQL,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      createdAt: [null],
      deletedAt: [null],
      descricao: [null],
      estoque: [null],
      estoqueMaximo: [null],
      estoqueMinimo: [null],
      id: [0],
      idLegado: [null],
      idUnidadeMedida: [null],
      nome: [null],
      pesoBruto: [null],
      pesoLiquido: [null],
      precoCusto: [null],
      precoPromocao: [null],
      precoVenda: [null],
      updatedAt: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  private loadFK(): void {
    this.fkUnidadeMedida = fkUnidadeMedida;

    // this.produtosGQL.getAllUnidadeMedida(null).subscribe(response => {
    //   this.fkUnidadeMedida = response.nodes;
    // },
    // );
  }

  editJson(data) {
    this.form = this.formBuilder.group(
      {
        createdAt: [data.createdAt],
        deletedAt: [data.deletedAt],
        descricao: [data.descricao],
        estoque: [data.estoque],
        estoqueMaximo: [data.estoqueMaximo],
        estoqueMinimo: [data.estoqueMinimo],
        id: [data.id],
        idLegado: [data.idLegado],
        idUnidadeMedida: [ Number(data.idUnidadeMedida)],
        nome: [data.nome, Validators.required],
        pesoBruto: [data.pesoBruto],
        pesoLiquido: [data.pesoLiquido],
        precoCusto: [data.precoCusto],
        precoPromocao: [data.precoPromocao],
        precoVenda: [data.precoVenda],
        updatedAt: [data.updatedAt],
      },
    );
  }

  ngOnInit(): void {
    this.loadFK();
    this.options = { multiple: true };
    // let tempOpt = JSON.parse(JSON.stringify(this.options));
    // this.options = tempOpt;

    this.idForm = Number( this.route.snapshot.paramMap.get('id') );

    if (this.idForm !== null) {
      this.operacao = 'Alteração';
      this.isLoadingResults = true;


      const result = datasource.find( prod => prod.id === this.idForm );
      this.editJson(result);

      // const condition = {
      //   id: this.idForm,
      // };

      // this.produtosGQL.getAllProduto(condition).subscribe(response => {
      //   const data = response.nodes[0];

      //   this.form = this.formBuilder.group(
      //     {
      //       createdAt: [data.createdAt],
      //       deletedAt: [data.deletedAt],
      //       descricao: [data.descricao],
      //       estoque: [data.estoque],
      //       estoqueMaximo: [data.estoqueMaximo],
      //       estoqueMinimo: [data.estoqueMinimo],
      //       id: [data.id],
      //       idLegado: [data.idLegado],
      //       idUnidadeMedida: [ Number(data.idUnidadeMedida)],
      //       nome: [data.nome, Validators.required],
      //       pesoBruto: [data.pesoBruto],
      //       pesoLiquido: [data.pesoLiquido],
      //       precoCusto: [data.precoCusto],
      //       precoPromocao: [data.precoPromocao],
      //       precoVenda: [data.precoVenda],
      //       updatedAt: [data.updatedAt],
      //     },
      //   );
      //   this.isLoadingResults = false;
      // }, (error) => {
      //   this.isLoadingResults = false;
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Erro na consulta dos produtos',
      //     text: error.message,
      //   });
      // });
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      Swal.fire(
        'Atenção',
        'Existem campos inválidos. Verifique novamente os campos marcados.',
        'info',
      );
      return;
    }

    Swal.fire({
      title: `Confirma gravação do Produto ?`,
      text: '',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: 'rgb(207, 52, 39)',
      confirmButtonColor: 'rgb(170, 170, 170)',
      cancelButtonText: 'Sim, gravar',
      confirmButtonText: 'Não, cancelar',
      reverseButtons: false,
    }).then((result) => {

      this.form.get('id').value === 0 ? this.create() : this.update();

    });
  }

  create() {
    const formSave = {
      produto: this.form.value,
    };

    delete formSave.produto.id;
    this.isLoadingResults = true;
    this.produtosGQL.createProduto(formSave).subscribe((response) => {
      this.isLoadingResults = false;
      this.router.navigate(['/pages/produtos']);
    }, (error) => {
      this.isLoadingResults = false;
      Swal.fire({
        icon: 'error',
        title: 'Erro na inclusão do produto',
        text: error.message,
      });
    });
  }

  update() {
    this.isLoadingResults = true;
    const formSave = {
      patch: this.form.value,
      id: this.idForm,
    };
    formSave.patch.idUnidadeMedida = Number(formSave.patch.idUnidadeMedida.id);

    this.produtosGQL.updateProduto(formSave).subscribe((response) => {
      this.isLoadingResults = false;
      this.router.navigate(['/pages/produtos']);
    }, (error) => {
      this.isLoadingResults = false;
      Swal.fire({
        icon: 'error',
        title: 'Erro na alteração do produto',
        text: error.message,
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/pages/produtos']);
  }
}
